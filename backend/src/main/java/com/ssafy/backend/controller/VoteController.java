package com.ssafy.backend.controller;

import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.service.RoomService;
import com.ssafy.backend.service.VoteService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/votes")
public class VoteController {

    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;
    private final VoteService voteService;

    public VoteController(VoteService voteService){
        this.voteService = voteService;
    }

    /**
     * idx는 room의 idx
     */
    @PutMapping("/{idx}")
    public ResponseEntity<? extends BaseResponseBody> pollVote(@PathVariable("idx") Long roomIdx, @RequestParam int number) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // 진행중인 투표인지 검사 true : 끝, false : 진행중
        if(voteService.checkEnd(roomIdx, LocalDateTime.now())){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail : Vote is Not Valid"));
        } else {
            boolean result = voteService.voting(roomIdx, principal.getUsername(), number);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, result ? successMsg : failMsg));
        }
    }

    @DeleteMapping("/{idx}")
    public ResponseEntity<? extends BaseResponseBody> cancelVote(@PathVariable("idx") Long roomIdx) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // 진행중인 투표인지 검사 true : 끝, false : 진행중
        if(voteService.checkEnd(roomIdx, LocalDateTime.now())){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail : Vote is Not Valid"));
        } else {
            boolean result = voteService.cancel(roomIdx, principal.getUsername());
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, result ? successMsg : failMsg));
        }
    }

    @PutMapping("/end/{idx}")
    public ResponseEntity<? extends BaseResponseBody> endVote(@PathVariable("idx") Long roomIdx) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // 진행중인 투표인지 검사 true : 끝, false : 진행중
        if(voteService.checkEnd(roomIdx, LocalDateTime.now())){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail : Vote is Not Valid"));
        } else {
            boolean result = voteService.endVote(roomIdx, principal.getUsername());
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, result ? successMsg : failMsg));
        }
    }
}