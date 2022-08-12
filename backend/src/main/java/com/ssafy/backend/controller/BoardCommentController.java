package com.ssafy.backend.controller;

import com.ssafy.backend.model.dto.BoardCommentDto;
import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.model.response.BoardResponse;
import com.ssafy.backend.service.BoardCommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/boardComments")
public class BoardCommentController {
    private static final Logger LOGGER = LoggerFactory.getLogger(BoardCommentController.class);

    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;

    private final BoardCommentService boardCommentService;

    public BoardCommentController(BoardCommentService boardCommentService){
        this.boardCommentService = boardCommentService;
    }

    /**
     * @param idx : boardIdx
     */
    @PostMapping("/{idx}")
    public ResponseEntity<? extends BaseResponseBody> createComment(@PathVariable("idx") Long idx, @RequestBody BoardCommentDto boardCommentDto){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boardCommentService.createBoardComment(principal.getUsername(), idx, boardCommentDto);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    /**
     * @param idx : boardCommentIdx
     */
    @PutMapping("/{idx}")
    public ResponseEntity<? extends BaseResponseBody> updateComment(@PathVariable("idx") Long idx, @RequestBody BoardCommentDto boardCommentDto){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean result = boardCommentService.updateBoardComment(principal.getUsername(), idx, boardCommentDto);
        if(result){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200,successMsg));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(BaseResponseBody.of(403, failMsg));
        }
    }

    /**
     * @param idx : boardCommentIdx
     */
    @DeleteMapping("/{idx}")
    public ResponseEntity<? extends BaseResponseBody> deleteComment(@PathVariable("idx") Long idx){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean result = boardCommentService.deleteBoardComment(principal.getUsername(), idx);
        if(result){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200,successMsg));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(BaseResponseBody.of(403, failMsg));
        }
    }
}
