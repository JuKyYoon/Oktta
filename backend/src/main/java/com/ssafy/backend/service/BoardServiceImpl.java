package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardDto;
import com.ssafy.backend.model.entity.Board;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.entity.UserRole;
import com.ssafy.backend.model.exception.BoardNotFoundException;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.repository.BoardRepository;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.util.DeleteUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {
    private static final Logger LOGGER = LoggerFactory.getLogger(BoardServiceImpl.class);

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final DeleteUserService deleteUserService;

    public BoardServiceImpl(BoardRepository boardRepository, UserRepository userRepository, DeleteUserService deleteUserService) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
        this.deleteUserService = deleteUserService;
    }

    @Override
    public BoardDto detailBoard(Long boardIdx) {
        Board board = boardRepository.findByIdx(boardIdx).orElseThrow(
                () -> new BoardNotFoundException("Board Not Found")
        );

        User user = board.getUser();

        String nickname = deleteUserService.checkNickName(board.getUser().getNickname());
        BoardDto boardDto = new BoardDto(nickname, board);
        boardDto.setProfileImage(user.getProfileImg());

        return boardDto;
    }

    @Override
    public Long createBoard(String id, BoardDto boardDto) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        int category = boardDto.getCategory();

        // 공지사항 작성, ROLE 비교
        if(category == 1 && !user.getRole().equals(UserRole.ROLE_ADMIN)){
            return -1L;
        }

        Board board = boardRepository.save(new Board.Builder(user, boardDto.getTitle(), boardDto.getContent(), boardDto.getCategory()).build());
        return board.getIdx();
    }

    @Override
    public int updateHit(Long boardIdx) {
        Board board = boardRepository.findByIdx(boardIdx).orElseThrow(
                () -> new BoardNotFoundException("Board Not Found")
        );

        return boardRepository.updateHit(boardIdx);
    }

    @Override
    public List<BoardDto> getBoardList(int category, int page, int limit) {
        List<Board> boardList = boardRepository.findBoardsByCategory(category, limit, (page-1) * limit);
        List<BoardDto> list = new ArrayList<>();

        for(Board b : boardList) {
            String nickname = deleteUserService.checkNickName(b.getUser().getNickname());
            list.add(new BoardDto(nickname, b.getIdx(), b.getTitle(), b.getCreateDate(), b.getHit()));
        }
        return list;
    }

    @Override
    public int getLastPage(int category, int limit) {
        int temp = boardRepository.findLastPage(category);
        return (temp % limit == 0) ? temp / limit : temp / limit + 1;
    }

    @Override
    public boolean deleteBoard(String id, Long boardIdx) {
        Board board = boardRepository.findByIdx(boardIdx).orElseThrow(
                () -> new BoardNotFoundException("Board Not Found")
        );

        User user = board.getUser();

        // 본인이 작성한 글이 아닌 경우, ROLE_USER의 경우
        if(user.getRole().equals(UserRole.ROLE_USER) && !board.getUser().getId().equals(id)) {
            return false;
        } else {
            boardRepository.delete(board);
            return true;
        }
    }

    @Override
    public boolean updateBoard(String id, Long boardIdx, BoardDto boardDto) {
        Board board = boardRepository.findByIdx(boardIdx).orElseThrow(
                () -> new BoardNotFoundException("Board Not Found")
        );

        if(!board.getUser().getId().equals(id)) {
            return false;
        } else {
            System.out.println(LocalDateTime.now());
            boardRepository.updateBoard(boardIdx, boardDto.getTitle(), boardDto.getContent(), LocalDateTime.now());
            return true;
        }
    }

    @Override
    public List<BoardDto> myBoards(String id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );
        List<Board> boardList = boardRepository.findAllByUser(user);
        List<BoardDto> list = new ArrayList<>();

        String nickname = userRepository.findNicknameByIdx(user.getIdx());
        for(Board b : boardList) {
            list.add(new BoardDto(nickname, b.getIdx(), b.getTitle(), b.getCreateDate(), b.getHit()));
        }

        return list;
    }
}
