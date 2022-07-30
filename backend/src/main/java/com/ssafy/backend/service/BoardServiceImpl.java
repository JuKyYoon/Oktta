package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardDto;
import com.ssafy.backend.model.entity.Board;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.repository.BoardRepository;
import com.ssafy.backend.model.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class BoardServiceImpl implements BoardService {
    private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public BoardServiceImpl(BoardRepository boardRepository, UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }

    @Override
    public BoardDto detailBoard(Long idx) {
        BoardDto boardDto = new BoardDto();
        Board board = boardRepository.findByIdx(idx).orElse(null);
        if(board != null){
            String nickname = userRepository.findNicknameByIdx(board.getUser().getIdx());
            boardDto = new BoardDto(nickname, board);
        }
        return boardDto;
    }

    @Override
    public void createBoard(User user, BoardDto board) {
        boardRepository.save(new Board.Builder(user, board.getTitle(), board.getContent(), board.getCategory()).build());
    }

    @Override
    public int updateHit(Long idx) {
        return boardRepository.updateHit(idx);
    }
}
