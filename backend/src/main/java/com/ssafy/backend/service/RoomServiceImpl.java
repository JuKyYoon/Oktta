package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.RoomDto;
import com.ssafy.backend.model.dto.lol.MatchDto;
import com.ssafy.backend.model.entity.Match;
import com.ssafy.backend.model.entity.Room;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.RoomNotFoundException;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.mapper.MatchMapper;
import com.ssafy.backend.model.mapper.RoomMapper;
import com.ssafy.backend.model.repository.MatchRepository;
import com.ssafy.backend.model.repository.RoomRepository;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.util.DeleteUserService;
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
    private final MatchRepository matchRepository;

    private final MatchMapper matchMapper;

    private final DeleteUserService deleteUserService;

    public RoomServiceImpl(UserRepository userRepository, RoomRepository roomRepository, MatchRepository matchRepository, MatchMapper matchMapper, DeleteUserService deleteUserService) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.matchRepository = matchRepository;
        this.matchMapper = matchMapper;
        this.deleteUserService = deleteUserService;
    }

    @Override
    public Long createRoom(RoomDto roomDto, String userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );
        // MatchDto to Match
        MatchDto matchDto = roomDto.getMatch();
        Match match = matchMapper.dtoToEntity(matchDto);
        matchRepository.save(match);
        Room room = roomRepository.save(
                new Room.Builder(user, roomDto.getTitle(), roomDto.getContent(), match).build()
        );
        return room.getIdx();
    }

    @Override
    public RoomDto getRoom(Long roomIdx) {
        Room room = roomRepository.findById(roomIdx).orElseThrow(
                () -> new RoomNotFoundException("Room Not Found in Get Room")
        );
        RoomDto roomDto = RoomMapper.mapper.toDto(room);
        Match match = matchRepository.getReferenceById(room.getMatch().getMatchId());
        System.out.println(match.getChampionId());
        System.out.println(match.getChampionName());
        roomDto.setMatch(matchMapper.entityToDto(match));
        String nickName = deleteUserService.checkNickName(room.getUser().getNickname());
        roomDto.setNickname(nickName);
        return roomDto;
    }

    @Override
    public int updateHit(Long roomIdx) {
        Room room = roomRepository.findById(roomIdx).orElseThrow(
                () -> new RoomNotFoundException("Room Not Found in Get Room")
        );

        return roomRepository.updateHit(roomIdx);
    }

    @Override
    public List<RoomDto> myRooms(String id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );
        List<Room> roomList = roomRepository.findAllByUser(user);
        List<RoomDto> list = new ArrayList<>();

        String nickname = deleteUserService.checkNickName(userRepository.findNicknameByIdx(user.getIdx()));
        for(Room r : roomList){
            list.add(new RoomDto(nickname, r.getIdx(), r.getTitle(), r.getCreateDate(), r.isLive(), r.getPeople(), r.getHit(), matchMapper.entityToDto(r.getMatch())));
        }

        return list;
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

        if(!room.getUser().getId().equals(userId)) {
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
            String nickName = deleteUserService.checkNickName(userRepository.findNicknameByIdx(r.getUser().getIdx()));
            //Match to MatchDto
            MatchDto matchDto = matchMapper.entityToDto(r.getMatch());
            list.add(new RoomDto(nickName, r.getIdx(), r.getTitle(), r.getCreateDate(), r.isLive(), r.getPeople(), r.getHit(), matchDto));
        }
        return list;
    }

    @Override
    public int getLastPage(int limit) {
        int temp = roomRepository.findLastPage();
        return (temp % limit == 0) ? temp / limit : temp / limit + 1;
    }
}
