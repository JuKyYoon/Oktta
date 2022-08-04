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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boards")
public class BoardController {
    private static final Logger LOGGER = LoggerFactory.getLogger(BoardController.class);

    @Value("${pagingLimit}")
    private int limit;

    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;

    private final UserRepository userRepository;

    private final BoardService boardService;

    public BoardController(UserRepository userRepository, BoardService boardService) {
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
    public ResponseEntity<? extends BaseResponseBody> createBoard(@RequestBody BoardDto boardDto){
        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername()).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );
        boardService.createBoard(user, boardDto);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    /**
     * @param category 0:자유게시판 1:공지사항
     * 한 페이지에 게시글 10개
     * List에 담아서 return
     */
    @GetMapping("")
    public ResponseEntity<? extends BaseResponseBody> listBoard(@RequestParam(defaultValue = "1") int category, @RequestParam(defaultValue = "1") int page){
        List<BoardDto> list = boardService.getBoardList(category, page, limit);
        int lastPage = boardService.getLastPage(category, limit);
        return ResponseEntity.status(200).body(BoardResponse.of(200, successMsg, list, lastPage));
    }

    /**
     * 게시글 삭제
     */
    @DeleteMapping("/{idx}")
    public ResponseEntity<? extends BaseResponseBody> deleteBoard(@PathVariable("idx") Long idx) {
        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean result = boardService.deleteBoard(principal.getUsername(), idx);
        if(result){
            return ResponseEntity.status(200).body(BoardResponse.of(200,successMsg));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(BaseResponseBody.of(403, failMsg));
        }
    }

    /**
     * 게시글 수정
     */
    @PutMapping("/{idx}")
    public ResponseEntity<? extends BaseResponseBody> updateBoard(@PathVariable("idx") Long idx, @RequestBody BoardDto boardDto) {
        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean result = boardService.updateBoard(principal.getUsername(), idx, boardDto);
        if(result){
            return ResponseEntity.status(200).body(BoardResponse.of(200,successMsg));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(BaseResponseBody.of(403, failMsg));
        }
    }
}