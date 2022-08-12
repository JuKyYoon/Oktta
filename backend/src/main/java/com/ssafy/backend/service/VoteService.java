package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.VoteDto;

import java.time.LocalDateTime;

public interface VoteService {
    void createVote(Long roomIdx, LocalDateTime now);
    boolean checkEnd(Long roomIdx, LocalDateTime now);
    boolean voting(Long roomIdx, String id, int number);
    boolean cancel(Long roomIdx, String id);
    boolean endVote(Long roomIdx, String id);
    void deleteVote(Long roomIdx);
    VoteDto getVoteDto(Long roomIdx);
    int getMyVote(Long roomIdx, String id);
}
