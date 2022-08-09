package com.ssafy.backend.service;

import com.ssafy.backend.model.compositekey.VoteRecordId;
import com.ssafy.backend.model.entity.Room;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.entity.Vote;
import com.ssafy.backend.model.entity.VoteRecord;
import com.ssafy.backend.model.exception.RoomNotFoundException;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.exception.VoteNotFoundException;
import com.ssafy.backend.model.repository.RoomRepository;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.model.repository.VoteRecordRepository;
import com.ssafy.backend.model.repository.VoteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class VoteServiceImpl implements VoteService{
    private final VoteRepository voteRepository;
    private final VoteRecordRepository voteRecordRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public VoteServiceImpl(VoteRepository voteRepository, VoteRecordRepository voteRecordRepository, RoomRepository roomRepository, UserRepository userRepository){
        this.voteRepository = voteRepository;
        this.voteRecordRepository = voteRecordRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void createVote(Long roomIdx, LocalDateTime now) {
        voteRepository.save(new Vote.Builder(roomIdx.toString(), now).build());
    }

    @Override
    public boolean checkEnd(Long roomIdx, LocalDateTime now) {
        Vote vote = voteRepository.findById(roomIdx.toString()).orElseThrow(
                () -> new VoteNotFoundException("Vote Not Found")
        );

        return now.isAfter(vote.getEndTime()) ? true : false;
    }

    @Override
    public boolean voting(Long roomIdx, String id, int number) {
        if(number < 1 || number > 5) {
            return false;
        }

        User user = userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        VoteRecord voteRecord = voteRecordRepository.findByRoomIdxAndAndUserIdx(roomIdx, user.getIdx());

        /**
         * voteRecord
         * 처음 투표하는 경우 null이므로 해당 number +1
         * 이미 투표한 경우, 저장된 number -1, 새로운 number +1
         */
        Vote vote = voteRepository.findById(roomIdx.toString()).orElseThrow(
                () -> new VoteNotFoundException("Vote Not Found")
        );

        if(voteRecord == null){
            vote = Vote.pollVote(vote, number + "", "garbage");
        } else {
            vote = Vote.pollVote(vote, number + "", voteRecord.getNumber() + "");
        }
        voteRepository.save(vote);

        // 투표 기록 저장
        voteRecordRepository.save(new VoteRecord.Builder(new VoteRecordId(roomIdx, user.getIdx()), number).build());
        return true;
    }

    @Override
    public boolean cancel(Long roomIdx, String id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        VoteRecord voteRecord = voteRecordRepository.findByRoomIdxAndAndUserIdx(roomIdx, user.getIdx());
        Vote vote = voteRepository.findById(roomIdx.toString()).orElseThrow(
                () -> new VoteNotFoundException("Vote Not Found")
        );
        if(voteRecord == null){
            return false;
        } else {
            voteRecordRepository.delete(voteRecord);
            vote = Vote.pollVote(vote, "garbage", voteRecord.getNumber() + "");
            voteRepository.save(vote);
            return true;
        }
    }

    @Override
    public boolean endVote(Long roomIdx, String id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        Room room = roomRepository.findById(roomIdx).orElseThrow(
                () -> new RoomNotFoundException("Room Not Found")
        );

        if(room.getUser().getIdx() != user.getIdx())
            return false;

        voteRepository.endVote(roomIdx.toString(), LocalDateTime.now());
        return true;
    }
}