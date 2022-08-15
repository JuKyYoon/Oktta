package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.compositekey.VoteRecordId;
import com.ssafy.backend.model.entity.VoteRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoteRecordRepository extends JpaRepository<VoteRecord, VoteRecordId> {

    VoteRecord findByRoomIdxAndUserIdx(Long roomIdx, Long userIdx);
    List<VoteRecord> findAllByRoomIdx(Long roomIdx);
}
