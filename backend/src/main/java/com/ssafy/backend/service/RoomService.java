package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardDto;
import com.ssafy.backend.model.dto.RoomDto;

import java.util.List;

public interface RoomService {
    long createRoom(RoomDto roomDto, String userId);
    RoomDto getRoom(long roomIdx);
    boolean updateRoom(RoomDto roomDto, String userId);
    boolean deleteRoom(long roomIdx, String userId);
    public List<RoomDto> getRoomList(int page, int limit);
    public int getLastPage(int limit);
}
