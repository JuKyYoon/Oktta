package com.ssafy.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonParser;
import com.ssafy.backend.model.dto.BoardCommentDto;
import com.ssafy.backend.model.dto.BoardDto;
import com.ssafy.backend.model.dto.RoomCommentDto;
import com.ssafy.backend.model.dto.RoomDto;
import com.ssafy.backend.model.dto.lol.MatchDto;
import com.ssafy.backend.model.entity.Match;
import com.ssafy.backend.model.repository.RoomRepository;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.model.response.MessageResponse;
import com.ssafy.backend.model.response.RoomResponse;
import com.ssafy.backend.service.RoomCommentService;
import com.ssafy.backend.service.RoomService;
import com.ssafy.backend.service.VoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/room")
public class RoomController {
    private static final Logger LOGGER = LoggerFactory.getLogger(RoomController.class);

    @Value("${pagingLimit}")
    private int pagingLimit;
    
    @Value("${myLimit}")
    private int myLimit;

    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;

    private final RoomService roomService;
    private final RoomCommentService roomCommentService;
    private final VoteService voteService;

    public RoomController(RoomService roomService, RoomCommentService roomCommentService, VoteService voteService) {
        this.roomService = roomService;
        this.roomCommentService = roomCommentService;
        this.voteService = voteService;
    }

    @PostMapping("")
    public ResponseEntity<MessageResponse> createRoom(@RequestBody Map<String, Object> map) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        RoomDto roomDto = new RoomDto();
        roomDto.setTitle(map.get("title").toString());
        roomDto.setContent(map.get("content").toString());
        MatchDto matchDto = new ObjectMapper().convertValue(map.get("matchDto"), MatchDto.class);
        roomDto.setMatch(matchDto);
        long roomIdx = roomService.createRoom(roomDto, principal.getUsername());
        voteService.createVote(roomIdx, LocalDateTime.now());
        return ResponseEntity.status(200).body(MessageResponse.of(200, successMsg, String.valueOf(roomIdx)));
    }

    @GetMapping("/{idx}")
    public ResponseEntity<RoomResponse> getRoom(@PathVariable("idx") Long roomIdx) {
        RoomDto roomDto = roomService.getRoom(roomIdx);

        List<RoomCommentDto> list = roomCommentService.getRoomCommentList(roomIdx);
        int temp = list.size() / pagingLimit;
        int lastPage = (list.size() % pagingLimit == 0) ? temp : temp + 1;
        
        if(voteService.checkEnd(roomIdx, LocalDateTime.now())) {
            roomDto.setVoteDto(voteService.getVoteDto(roomIdx));
        }

        return ResponseEntity.status(200).body(RoomResponse.of(200, successMsg, roomDto, list, lastPage));
    }

    @PutMapping("/hit/{idx}")
    public ResponseEntity<BaseResponseBody> updateHit(@PathVariable("idx") Long roomIdx) {
        roomService.updateHit(roomIdx);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    @PutMapping("/{idx}")
    public ResponseEntity<BaseResponseBody> updateRoom(@PathVariable("idx") Long roomIdx, @RequestBody RoomDto roomDto) {

        LOGGER.info("Update Room Title or Content");
        roomDto.setIdx(roomIdx);
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean result = roomService.updateRoom(roomDto, principal.getUsername());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, result ? successMsg : failMsg));
    }

    @DeleteMapping("/{idx}")
    public ResponseEntity<BaseResponseBody> deleteRoom(@PathVariable("idx") String idx) {
        LOGGER.info("Delete Room");
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean result = roomService.deleteRoom(Long.parseLong(idx), principal.getUsername());
        voteService.deleteVote(Long.parseLong(idx));

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, result ? successMsg : failMsg));
    }

    @GetMapping("")
    public ResponseEntity<? extends BaseResponseBody> listRoom(@RequestParam(defaultValue = "1") int page){
        List<RoomDto> list = roomService.getRoomList(page, pagingLimit);
        int lastPage = roomService.getLastPage(pagingLimit);
        return ResponseEntity.status(200).body(RoomResponse.of(200, successMsg, list, lastPage));
    }

    @GetMapping("/mine")
    public ResponseEntity<? extends BaseResponseBody> myRooms() {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<RoomDto> list = roomService.myRooms(principal.getUsername());
        
        int temp = list.size() / myLimit;
        int lastPage = (list.size() % myLimit == 0) ? temp : temp + 1;
        return ResponseEntity.status(200).body(RoomResponse.of(200, successMsg, list, lastPage));
    }
}
