package com.ssafy.backend.model.entity;

import com.ssafy.backend.model.compositekey.VoteRecordId;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "vote_record")
@DynamicInsert
@DynamicUpdate
@IdClass(VoteRecordId.class)
public class VoteRecord implements Serializable {
    @Id
    @Column(name = "room_idx")
    private Long roomIdx;

    @Id
    private Long userIdx;

    @Column(name = "number")
    private int number;

    public Long getRoomIdx() {
        return roomIdx;
    }

    public Long getUserIdx() {
        return userIdx;
    }

    public int getNumber() {
        return number;
    }

    protected VoteRecord(){}

    private VoteRecord(Builder builder) {
        this.roomIdx = builder.voteRecordId.getRoomIdx();
        this.userIdx = builder.voteRecordId.getUserIdx();
        this.number = builder.number;
    }

    public static class Builder{
        private VoteRecordId voteRecordId;
        private int number;

        public Builder(VoteRecordId voteRecordId, int number) {
            this.voteRecordId = voteRecordId;
            this.number = number;
        }

        public VoteRecord build() {
            return new VoteRecord(this);
        }
    }
}
