package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.RoomDto;

import java.util.List;

public interface RoomService {
    Long createRoom(RoomDto roomDto, String userId);
    RoomDto getRoom(Long roomIdx);
    boolean updateRoom(RoomDto roomDto, String userId);
    boolean deleteRoom(long roomIdx, String userId);
    public List<RoomDto> getRoomList(int page, int limit);
    public int getLastPage(int limit);
    int getOnAirLastPage(int limit);
    int updateHit(Long roomIdx);
    List<RoomDto> myRooms(String id);
    List<RoomDto> getOnAirRoomList(int page, int limit);
    List<RoomDto> getTopOnAirRoomList();
}
