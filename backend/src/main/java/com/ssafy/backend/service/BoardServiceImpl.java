package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardDto;
import com.ssafy.backend.model.entity.Board;
import com.ssafy.backend.model.repository.BoardRepository;
import com.ssafy.backend.model.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

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
    public void createBoard(Long idx, BoardDto board) {
        boardRepository.save(new Board.Builder(idx, board.getTitle(), board.getContent(), board.getCategory()).build());
    }
}
