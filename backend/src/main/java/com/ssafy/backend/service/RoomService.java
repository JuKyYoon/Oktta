package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.RoomDto;

public interface RoomService {
    long createRoom(RoomDto roomDto, String userId);
    RoomDto getRoom(long roomIdx);
    boolean updateRoom(RoomDto roomDto, String userId);
    boolean deleteRoom(long roomIdx, String userId);
}
