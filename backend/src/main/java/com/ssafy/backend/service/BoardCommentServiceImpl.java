package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardCommentDto;
import com.ssafy.backend.model.entity.Board;
import com.ssafy.backend.model.entity.BoardComment;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.BoardNotFoundException;
import com.ssafy.backend.model.exception.BoardCommentNotFoundException;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.repository.BoardRepository;
import com.ssafy.backend.model.repository.BoardCommentRepository;
import com.ssafy.backend.model.repository.UserRepository;
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

    public BoardCommentServiceImpl(BoardCommentRepository boardCommentRepository, UserRepository userRepository, BoardRepository boardRepository) {
        this.boardCommentRepository = boardCommentRepository;
        this.userRepository = userRepository;
        this.boardRepository = boardRepository;
    }

    /**
     * @param boardIdx 해당 boardIdx의 Comment list
     */
    @Override
    public List<BoardCommentDto> getCommentList(Long boardIdx) {
        List<BoardComment> boardCommentList = boardCommentRepository.findCommentsByBoardIdxAndCategory(boardIdx);
        List<BoardCommentDto> list = new ArrayList<>();

        for(BoardComment c : boardCommentList){
            String nickname = userRepository.findNicknameByIdx(c.getUser().getIdx());
            list.add(new BoardCommentDto(c.getIdx(), nickname, c.getContent(), c.getCreateTime()));
        }

        return list;
    }

    @Override
    public void createComment(String id, Long boardIdx, BoardCommentDto boardCommentDto) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        Board board = boardRepository.findByIdx(boardIdx).orElseThrow(
                () -> new BoardNotFoundException("Board Not Found")
        );

        boardCommentRepository.save(new BoardComment.Builder(board, user, boardCommentDto.getContent()).build());

    }

    @Override
    public boolean updateComment(String id, Long idx, BoardCommentDto boardCommentDto){
        BoardComment boardComment = boardCommentRepository.findById(idx).orElseThrow(
                () -> new BoardCommentNotFoundException("Comment Not Found")
        );
        if(!boardComment.getUser().getId().equals(id)){
            return false;
        } else {
            boardCommentRepository.updateBoardComment(idx, boardCommentDto.getContent());
            return true;
        }
    }

    /**
     * @param id = User의 아이디(email), 본인 확인을 위해
     * @param idx = Comment의 idx
     */
    @Override
    public boolean deleteComment(String id, Long idx) {
        BoardComment boardComment = boardCommentRepository.findById(idx).orElseThrow(
                () -> new BoardCommentNotFoundException("Comment Not Found")
        );

        if(!boardComment.getUser().getId().equals(id)){
            return false;
        } else {
            boardCommentRepository.delete(boardComment);
            return true;
        }
    }
}
