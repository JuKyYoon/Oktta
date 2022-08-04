package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.RoomDto;
import com.ssafy.backend.model.entity.Room;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.RoomNotFoundException;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.mapper.RoomMapper;
import com.ssafy.backend.model.repository.RoomRepository;
import com.ssafy.backend.model.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {
    private static final Logger LOGGER = LoggerFactory.getLogger(RoomServiceImpl.class);

    private final UserRepository userRepository;

    private final RoomRepository roomRepository;

    public RoomServiceImpl(UserRepository userRepository, RoomRepository roomRepository) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public long createRoom(RoomDto roomDto, String userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );
        Room room = roomRepository.save(
                new Room.Builder(user, roomDto.getTitle(), roomDto.getContent()).build()
        );
        return room.getIdx();
    }

    @Override
    public RoomDto getRoom(long roomIdx) {
        Room room = roomRepository.findById(roomIdx).orElseThrow(
                () -> new RoomNotFoundException("Room Not Found in Get Room")
        );
        RoomDto roomDto = RoomMapper.mapper.toDto(room);
        roomDto.setNickname(room.getUser().getNickname());
        return roomDto;
    }

    @Override
    public boolean updateRoom(RoomDto roomDto, String userId) {
        // 현재 요청을 보낸 유저
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );
        LOGGER.info(user.getNickname());
        int result = roomRepository.updateRoom(roomDto.getTitle(), roomDto.getContent(), roomDto.getIdx(),
                user, LocalDateTime.now());
        return result == 1;
    }

    @Override
    public boolean deleteRoom(long roomIdx, String userId) {
        Room room = roomRepository.findById(roomIdx).orElseThrow(
                () -> new RoomNotFoundException("Room Not Found in DeleteRoom")
        );

        if(room.getUser().getId().equals(userId)) {
            return false;
        } else {
            roomRepository.delete(room);
            return true;
        }
    }

    @Override
    public List<RoomDto> getRoomList(int page, int limit) {
        List<Room> roomList = roomRepository.findRooms(limit, (page - 1) * limit);
        List<RoomDto> list = new ArrayList<>();

        System.out.println(roomList.size());

        for(Room r : roomList){
            String nickname = userRepository.findNicknameByIdx(r.getUser().getIdx());
            list.add(new RoomDto(nickname, r.getIdx(), r.getTitle(), r.getCreateDate(), r.isLive(), r.getPeople(), r.getHit()));
        }
        return list;
    }

    @Override
    public int getLastPage(int limit) {
        return roomRepository.findLastPage() / limit + 1;
    }
}
