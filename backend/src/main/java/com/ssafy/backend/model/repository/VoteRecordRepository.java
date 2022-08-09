package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.compositekey.VoteRecordId;
import com.ssafy.backend.model.entity.VoteRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRecordRepository extends JpaRepository<VoteRecord, VoteRecordId> {

    VoteRecord findByRoomIdxAndAndUserIdx(Long roomIdx, Long userIdx);
}
