package com.ssafy.backend.model.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Entity;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vote")
@DynamicInsert
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
public class Vote {

    @Id
    @Column(name = "room_idx", nullable = false)
    private String roomIdx;

    @Column(name = "garbage", columnDefinition = "BIGINT(20) default 0")
    private Long garbage;

    @Column(name = "first", columnDefinition = "BIGINT(20) default 0")
    private Long first;

    @Column(name = "second", columnDefinition = "BIGINT(20) default 0")
    private Long second;

    @Column(name = "third", columnDefinition = "BIGINT(20) default 0")
    private Long third;

    @Column(name = "fourth", columnDefinition = "BIGINT(20) default 0")
    private Long fourth;

    @Column(name = "fifth", columnDefinition = "BIGINT(20) default 0")
    private Long fifth;

    @Column(name = "total", columnDefinition = "BIGINT(20) default 0")
    private Long total;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    public String getRoomIdx() {
        return roomIdx;
    }

    public Long getFirst() {
        return first;
    }

    public Long getSecond() {
        return second;
    }

    public Long getThird() {
        return third;
    }

    public Long getFourth() {
        return fourth;
    }

    public Long getFifth() {
        return fifth;
    }

    public Long getTotal() {
        return total;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    protected Vote(){
    }

    private Vote(Builder builder) {
        this.roomIdx = builder.roomIdx;
        this.endTime = builder.endTime;
    }

    public static class Builder {
        private String roomIdx;
        private LocalDateTime endTime;

        public Builder(String roomIdx, LocalDateTime now) {
            this.roomIdx = roomIdx;
            this.endTime = now.plusDays(3);
        }

        public Vote build() {
            return new Vote(this);
        }
    }

    public static Vote pollVote(Vote v, int up, int down){
        switch(up){
            case 1:
                ++v.first;
                break;
            case 2:
                ++v.second;
                break;
            case 3:
                ++v.third;
                break;
            case 4:
                ++v.fourth;
                break;
            case 5:
                ++v.fifth;
                break;
            default:
                ++v.garbage;
                break;
        }

        switch(down){
            case 1:
                --v.first;
                break;
            case 2:
                --v.second;
                break;
            case 3:
                --v.third;
                break;
            case 4:
                --v.fourth;
                break;
            case 5:
                --v.fifth;
                break;
            default:
                --v.garbage;
                break;
        }

        return v;
    }
}
