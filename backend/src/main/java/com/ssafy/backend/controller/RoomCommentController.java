package com.ssafy.backend.controller;

import com.ssafy.backend.model.dto.RoomCommentDto;
import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.service.RoomCommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roomComments")
public class RoomCommentController {
    private static final Logger LOGGER = LoggerFactory.getLogger(RoomCommentController.class);

    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;

    private final RoomCommentService roomCommentService;

    public RoomCommentController(RoomCommentService roomCommentService){
        this.roomCommentService = roomCommentService;
    }

    /**
     * @param idx : boardIdx
     */
    @PostMapping("/{idx}")
    public ResponseEntity<? extends BaseResponseBody> createComment(@PathVariable("idx") Long idx, @RequestBody RoomCommentDto roomCommentDto){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        roomCommentService.createRoomComment(principal.getUsername(), idx, roomCommentDto);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    /**
     * @param idx : roomCommentIdx
     */
    @PutMapping("/{idx}")
    public ResponseEntity<? extends BaseResponseBody> updateComment(@PathVariable("idx") Long idx, @RequestBody RoomCommentDto roomCommentDto){
        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean result = roomCommentService.updateRoomComment(principal.getUsername(), idx, roomCommentDto);
        if(result){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200,successMsg));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(BaseResponseBody.of(403, failMsg));
        }
    }

    /**
     * @param idx : roomCommentIdx
     */
    @DeleteMapping("/{idx}")
    public ResponseEntity<? extends BaseResponseBody> deleteComment(@PathVariable("idx") Long idx){
        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean result = roomCommentService.deleteRoomComment(principal.getUsername(), idx);
        if(result){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200,successMsg));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(BaseResponseBody.of(403, failMsg));
        }
    }
}
