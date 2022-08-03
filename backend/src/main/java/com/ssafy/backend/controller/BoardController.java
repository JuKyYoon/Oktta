package com.ssafy.backend.controller;

import com.ssafy.backend.model.dto.BoardDto;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.repository.BoardRepository;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.model.response.BoardResponse;
import com.ssafy.backend.service.BoardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/boards")
public class BoardController {
    private Logger logger = LoggerFactory.getLogger(UserController.class);

    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;



    private final BoardRepository boardRepository;

    private final UserRepository userRepository;

    private final BoardService boardService;

    public BoardController(BoardRepository boardRepository, UserRepository userRepository, BoardService boardService) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
        this.boardService = boardService;
    }

    @GetMapping("/{idx}")
    public ResponseEntity<? extends BaseResponseBody> detailBoard(@PathVariable("idx") String boardIdx){
        BoardDto board = boardService.detailBoard(Long.parseLong(boardIdx));
        boardService.updateHit(board.getIdx());

        return ResponseEntity.status(200).body(BoardResponse.of(200, successMsg, board));
    }

    @PostMapping("")
    public ResponseEntity<? extends BaseResponseBody> createBoard(@RequestBody BoardDto board){
        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername()).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );
        boardService.createBoard(user, board);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }
}
