package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardCommentDto;
import com.ssafy.backend.model.dto.RoomCommentDto;

import java.util.List;

public interface RoomCommentService {
    List<RoomCommentDto> getRoomCommentList(Long roomIdx);
    void createRoomComment(String id, Long idx, RoomCommentDto roomCommentDto);
    boolean updateRoomComment(String id, Long idx, RoomCommentDto roomCommentDto);
    boolean deleteRoomComment(String id, Long idx);
}
