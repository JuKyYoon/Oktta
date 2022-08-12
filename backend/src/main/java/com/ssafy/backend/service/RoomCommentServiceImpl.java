package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.RoomCommentDto;
import com.ssafy.backend.model.entity.*;
import com.ssafy.backend.model.exception.CommentNotFoundException;
import com.ssafy.backend.model.exception.RoomNotFoundException;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.repository.*;
import com.ssafy.backend.util.DeleteUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomCommentServiceImpl implements RoomCommentService {
    private static final Logger LOGGER = LoggerFactory.getLogger(RoomCommentServiceImpl.class);

    private final RoomCommentRepository roomCommentRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    private final DeleteUserService deleteUserService;

    public RoomCommentServiceImpl(RoomCommentRepository roomCommentRepository, UserRepository userRepository, RoomRepository roomRepository, DeleteUserService deleteUserService) {
        this.roomCommentRepository = roomCommentRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.deleteUserService = deleteUserService;
    }

    /**
     * @param roomIdx 해당 boardIdx의 Comment list
     */
    @Override
    public List<RoomCommentDto> getRoomCommentList(Long roomIdx) {
        List<RoomComment> roomCommentList = roomCommentRepository.findCommentsByRoomIdx(roomIdx);
        List<RoomCommentDto> list = new ArrayList<>();

        for(RoomComment r : roomCommentList){
            String nickname = deleteUserService.checkNickName(userRepository.findNicknameByIdx(r.getUser().getIdx()));
            list.add(new RoomCommentDto(r.getIdx(), nickname, r.getContent(), r.getCreateTime()));
        }

        return list;
    }

    @Override
    public void createRoomComment(String id, Long roomIdx, RoomCommentDto roomCommentDto) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        Room room = roomRepository.findById(roomIdx).orElseThrow(
                () -> new RoomNotFoundException("Room Not Found")
        );

        roomCommentRepository.save(new RoomComment.Builder(room, user, roomCommentDto.getContent()).build());
    }

    /**
     * @param id 접속 중인 user의 id
     * @param idx boardComment의 idx
     */
    @Override
    public boolean updateRoomComment(String id, Long idx, RoomCommentDto roomCommentDto){
        RoomComment roomComment = roomCommentRepository.findById(idx).orElseThrow(
                () -> new CommentNotFoundException("Comment Not Found")
        );
        if(!roomComment.getUser().getId().equals(id)){
            return false;
        } else {
            roomCommentRepository.updateBoardComment(idx, roomCommentDto.getContent());
            return true;
        }
    }

    /**
     * @param id User의 아이디(email), 본인 확인을 위해
     * @param idx RoomComment의 idx
     */
    @Override
    public boolean deleteRoomComment(String id, Long idx) {
        RoomComment roomComment = roomCommentRepository.findById(idx).orElseThrow(
                () -> new CommentNotFoundException("Comment Not Found")
        );

        if(!roomComment.getUser().getId().equals(id)){
            return false;
        } else {
            roomCommentRepository.delete(roomComment);
            return true;
        }
    }
}
