package com.ssafy.backend.model.compositekey;

import java.io.Serializable;

public class VoteRecordId implements Serializable {
    private Long roomIdx;
    private Long userIdx;

    public Long getRoomIdx() {
        return roomIdx;
    }

    public Long getUserIdx() {
        return userIdx;
    }

    public VoteRecordId() {}
    public VoteRecordId(Long roomIdx, Long userIdx) {
        this.roomIdx = roomIdx;
        this.userIdx = userIdx;
    }
}
