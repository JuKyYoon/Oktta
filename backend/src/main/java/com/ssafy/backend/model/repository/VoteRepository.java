package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, String> {
    @Transactional
    @Modifying
    @Query("UPDATE Vote vote SET vote.endTime = :now WHERE vote.roomIdx = :roomIdx")
    void endVote(String roomIdx, LocalDateTime now);

    @Transactional
    @Modifying
    @Query("UPDATE Vote vote SET vote.total = vote.total + :value WHERE vote.roomIdx = :roomIdx")
    void updateTotal(String roomIdx, Long value);
}
