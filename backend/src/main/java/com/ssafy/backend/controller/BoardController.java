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

import java.util.List;

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

    /**
     * 게시글 상세 정보
     */
    @GetMapping("/{idx}")
    public ResponseEntity<? extends BaseResponseBody> detailBoard(@PathVariable("idx") String boardIdx){
        BoardDto board = boardService.detailBoard(Long.parseLong(boardIdx));
        boardService.updateHit(board.getIdx());

        return ResponseEntity.status(200).body(BoardResponse.of(200, successMsg, board));
    }

    /**
     * POST로 들어오는 게시글 DB에 저장
     */
    @PostMapping("")
    public ResponseEntity<? extends BaseResponseBody> createBoard(@RequestBody BoardDto board){
        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername()).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );
        boardService.createBoard(user, board);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    /**
     * @param category 0:자유게시판 1:공지사항
     * 한 페이지에 게시글 10개
     * List에 담아서 return
     */
    @GetMapping("/{category}/{page}")
    public ResponseEntity<? extends BaseResponseBody> listBoard(@PathVariable("category") int category, @PathVariable("page") int page){
        List<BoardDto> list = boardService.getBoardList(category, (page - 1) * 10);
        return ResponseEntity.status(200).body(BoardResponse.of(200, successMsg, list));
    }
}