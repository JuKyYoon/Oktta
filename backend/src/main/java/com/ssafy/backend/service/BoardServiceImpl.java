package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardDto;
import com.ssafy.backend.model.entity.Board;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.BoardNotFoundException;
import com.ssafy.backend.model.repository.BoardRepository;
import com.ssafy.backend.model.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {
    private static final Logger LOGGER = LoggerFactory.getLogger(BoardServiceImpl.class);

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public BoardServiceImpl(BoardRepository boardRepository, UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }

    @Override
    public BoardDto detailBoard(Long idx) {
        BoardDto boardDto = new BoardDto();
        Board board = boardRepository.findByIdx(idx).orElseThrow(
                () -> new BoardNotFoundException("Board Not Found")
        );
        String nickname = userRepository.findNicknameByIdx(board.getUser().getIdx());
        boardDto = new BoardDto(nickname, board);

        return boardDto;
    }

    @Override
    public void createBoard(User user, BoardDto boardDto) {
        boardRepository.save(new Board.Builder(user, boardDto.getTitle(), boardDto.getContent(), boardDto.getCategory()).build());
    }

    @Override
    public int updateHit(Long idx) {
        return boardRepository.updateHit(idx);
    }

    @Override
    public List<BoardDto> getBoardList(int category, int page, int limit) {
        List<Board> boardList = boardRepository.findBoardsByCategory(category, limit, (page-1) * limit);
        List<BoardDto> list = new ArrayList<>();

        for(Board b : boardList) {
            String nickname = userRepository.findNicknameByIdx(b.getUser().getIdx());
            list.add(new BoardDto(nickname, b.getIdx(), b.getTitle(), b.getCreateDate(), b.getHit()));
        }
        return list;
    }

    @Override
    public int getLastPage(int category, int limit) {
        return boardRepository.findLastPage(category) / limit + 1;
    }

    @Override
    public boolean deleteBoard(String id, Long idx) {
        Board board = boardRepository.findByIdx(idx).orElseThrow(
                () -> new BoardNotFoundException("Board Not Found")
        );

        // 본인이 작성한 글이 아닌 경우
        if(!board.getUser().getId().equals(id)) {
            return false;
        } else {
            boardRepository.delete(board);
            return true;
        }
    }

    @Override
    public boolean updateBoard(String id, Long idx, BoardDto boardDto) {
        Board board = boardRepository.findByIdx(idx).orElseThrow(
                () -> new BoardNotFoundException("Board Not Found")
        );

        if(!board.getUser().getId().equals(id)) {
            return false;
        } else {
            System.out.println(LocalDateTime.now());
            boardRepository.updateBoard(idx, boardDto.getTitle(), boardDto.getContent(), LocalDateTime.now());
            return true;
        }
    }
}
