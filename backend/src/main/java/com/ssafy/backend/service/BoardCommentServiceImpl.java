package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardCommentDto;
import com.ssafy.backend.model.entity.Board;
import com.ssafy.backend.model.entity.BoardComment;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.entity.UserRole;
import com.ssafy.backend.model.exception.BoardNotFoundException;
import com.ssafy.backend.model.exception.CommentNotFoundException;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.repository.BoardRepository;
import com.ssafy.backend.model.repository.BoardCommentRepository;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.util.DeleteUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BoardCommentServiceImpl implements BoardCommentService {
    private static final Logger LOGGER = LoggerFactory.getLogger(BoardCommentServiceImpl.class);

    private final BoardCommentRepository boardCommentRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final DeleteUserService deleteUserService;

    public BoardCommentServiceImpl(BoardCommentRepository boardCommentRepository, UserRepository userRepository, BoardRepository boardRepository, DeleteUserService deleteUserService) {
        this.boardCommentRepository = boardCommentRepository;
        this.userRepository = userRepository;
        this.boardRepository = boardRepository;
        this.deleteUserService = deleteUserService;
    }

    /**
     * @param boardIdx 해당 boardIdx의 Comment list
     */
    @Override
    public List<BoardCommentDto> getBoardCommentList(Long boardIdx) {
        List<BoardComment> boardCommentList = boardCommentRepository.findCommentsByBoardIdxAndCategory(boardIdx);
        List<BoardCommentDto> list = new ArrayList<>();

        for(BoardComment c : boardCommentList){
            String nickname = deleteUserService.checkNickName(c.getUser().getNickname());
            list.add(new BoardCommentDto(c.getIdx(), nickname, c.getContent(), c.getCreateTime()));
        }

        return list;
    }

    @Override
    public void createBoardComment(String id, Long boardIdx, BoardCommentDto boardCommentDto) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        Board board = boardRepository.findByIdx(boardIdx).orElseThrow(
                () -> new BoardNotFoundException("Board Not Found")
        );

        boardCommentRepository.save(new BoardComment.Builder(board, user, boardCommentDto.getContent()).build());

    }

    /**
     * @param id 접속 중인 user의 id
     * @param idx boardComment의 idx
     */
    @Override
    public boolean updateBoardComment(String id, Long idx, BoardCommentDto boardCommentDto){
        BoardComment boardComment = boardCommentRepository.findById(idx).orElseThrow(
                () -> new CommentNotFoundException("Comment Not Found")
        );
        if(!boardComment.getUser().getId().equals(id)){
            return false;
        } else {
            boardCommentRepository.updateBoardComment(idx, boardCommentDto.getContent());
            return true;
        }
    }

    /**
     * @param id User의 아이디(email), 본인 확인을 위해
     * @param idx BoardComment의 idx
     */
    @Override
    public boolean deleteBoardComment(String id, Long idx) {
        BoardComment boardComment = boardCommentRepository.findById(idx).orElseThrow(
                () -> new CommentNotFoundException("Comment Not Found")
        );

        User user = boardComment.getUser();

        if(user.getRole().equals(UserRole.ROLE_USER) && !boardComment.getUser().getId().equals(id)){
            return false;
        } else {
            boardCommentRepository.delete(boardComment);
            return true;
        }
    }
}
