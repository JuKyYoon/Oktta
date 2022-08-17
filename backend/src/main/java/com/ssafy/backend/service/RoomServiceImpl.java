package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.RoomDto;
import com.ssafy.backend.model.dto.lol.MatchDto;
import com.ssafy.backend.model.entity.*;
import com.ssafy.backend.model.exception.InputDataNullException;
import com.ssafy.backend.model.exception.RoomNotFoundException;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.mapper.MatchMapper;
import com.ssafy.backend.model.mapper.RoomMapper;
import com.ssafy.backend.model.repository.LolAuthRepository;
import com.ssafy.backend.model.repository.MatchRepository;
import com.ssafy.backend.model.repository.RoomRepository;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.util.DeleteUserService;
import io.openvidu.java.client.Session;
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
    private final LolAuthRepository lolAuthRepository;
    private final DeleteUserService deleteUserService;
    private final SessionService sessionService;

    public RoomServiceImpl(UserRepository userRepository, RoomRepository roomRepository, MatchRepository matchRepository, MatchMapper matchMapper, LolAuthRepository lolAuthRepository, DeleteUserService deleteUserService, SessionService sessionService) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.matchRepository = matchRepository;
        this.matchMapper = matchMapper;
        this.lolAuthRepository = lolAuthRepository;
        this.deleteUserService = deleteUserService;
        this.sessionService = sessionService;
    }

    @Override
    public Long createRoom(RoomDto roomDto, String userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );
        // MatchDto to Match
        MatchDto matchDto = roomDto.getMatchDto();
        Match match = matchMapper.dtoToEntity(matchDto);
        matchRepository.save(match);
        Room room = roomRepository.save(
                new Room.Builder(user, roomDto.getTitle(), roomDto.getContent(), match, roomDto.getHostSummonerName(), roomDto.getHostTeamId()).build()
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
        roomDto.setMatchDto(matchMapper.entityToDto(match));
        User user = room.getUser();
        String nickName = deleteUserService.checkNickName(user.getNickname());
        roomDto.setNickname(nickName);
        if(!nickName.equals("알수없음")){
            roomDto.setProfileImage(user.getProfileImg());
            LolAuth lolAuth = lolAuthRepository.findByUserId(user.getId()).orElse(null);
            if(lolAuth != null){
                roomDto.setTier(lolAuth.getTier());
            }
        }
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
            list.add(new RoomDto(nickname, r.getIdx(), r.getTitle(), r.getCreateDate(), r.isLive(), r.getPeople(), r.getHit(), matchMapper.entityToDto(r.getMatch()), r.getHostSummonerName(), r.getHostTeamId()));
        }

        return list;
    }

    @Override
    public boolean updateRoom(RoomDto roomDto, String userId) {
        // 현재 요청을 보낸 유저
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );
        MatchDto matchDto = roomDto.getMatchDto();
        if(matchDto == null){
            throw new InputDataNullException("Match Is Null");
        }
        Match match = matchMapper.dtoToEntity(matchDto);
        matchRepository.save(match);
        int result = roomRepository.updateRoom(roomDto.getTitle(), roomDto.getContent(), roomDto.getIdx(),
                user, LocalDateTime.now(), match, roomDto.getHostSummonerName(), roomDto.getHostTeamId());

        return result == 1;
    }

    @Override
    public boolean deleteRoom(long roomIdx, String userId) {
        Room room = roomRepository.findById(roomIdx).orElseThrow(
                () -> new RoomNotFoundException("Room Not Found in DeleteRoom")
        );
        
        // 세션 켜져 있으면 제거 불가능
        Session session = sessionService.searchSession(roomIdx);
        if(session != null) {
            return false;
        }

        User user = room.getUser();

        if(user.getRole().equals(UserRole.ROLE_USER) && !room.getUser().getId().equals(userId)) {
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
        for(Room r : roomList){
            User user = r.getUser();
            String nickName = deleteUserService.checkNickName(user.getNickname());
            //Match to MatchDto
            list.add(new RoomDto(nickName, r.getIdx(), r.getTitle(), r.getCreateDate(), r.isLive(), r.getPeople(), r.getHit(), null, r.getHostSummonerName(), r.getHostTeamId()));
        }
        return list;
    }

    @Override
    public int getLastPage(int limit) {
        int temp = roomRepository.findLastPage();
        return (temp % limit == 0) ? temp / limit : temp / limit + 1;
    }

    @Override
    public int getOnAirLastPage(int limit) {
        int temp = roomRepository.findOnAirLastPage();
        return (temp % limit == 0) ? temp / limit : temp / limit + 1;
    }

    @Override
    public List<RoomDto> getOnAirRoomList(int page, int limit){
        List<Room> roomList = roomRepository.findOnAirRoomList(limit, (page - 1) * limit);
        List<RoomDto> list = new ArrayList<>();
        for(Room room : roomList){
            RoomDto roomDto = RoomMapper.mapper.toDto(room);
            User user = room.getUser();
            roomDto.setNickname(user.getNickname());
            roomDto.setProfileImage(user.getProfileImg());
            LolAuth lolAuth = lolAuthRepository.findByUserId(user.getId()).orElse(null);
            if(lolAuth != null){
                roomDto.setTier(lolAuth.getTier());
            }
            MatchDto matchDto = matchMapper.entityToDto(room.getMatch());
            roomDto.setMatchDto(matchDto);
            list.add(roomDto);
        }
        return list;
    }

    @Override
    public List<RoomDto> getTopOnAirRoomList() {
        List<Room> roomList = roomRepository.findTopOnAirRoomList();
        List<RoomDto> list = new ArrayList<>();
        for(Room room : roomList){
            RoomDto roomDto = RoomMapper.mapper.toDto(room);
            User user = room.getUser();
            roomDto.setNickname(user.getNickname());
            roomDto.setProfileImage(user.getProfileImg());
            LolAuth lolAuth = lolAuthRepository.findByUserId(user.getId()).orElse(null);
            if(lolAuth != null){
                roomDto.setTier(lolAuth.getTier());
            }
            MatchDto matchDto = matchMapper.entityToDto(room.getMatch());
            roomDto.setMatchDto(matchDto);
            list.add(roomDto);
        }
        return list;
    }
}
