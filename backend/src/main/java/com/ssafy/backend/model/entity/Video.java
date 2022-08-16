package com.ssafy.backend.model.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "video")
@DynamicInsert
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long idx;

    @ManyToOne(targetEntity = Room.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "room_idx")
    private Room room;

    @Lob
    @Column(name = "record_url", nullable = false)
    private String recordUrl;

    public Long getIdx() {
        return idx;
    }

    public Room getRoom() {
        return room;
    }

    public String getRecordUrl() {
        return recordUrl;
    }

    protected Video() {}

    private Video(Builder builder) {
        this.room = builder.room;
        this.recordUrl = builder.recordUrl;
    }

    public static class Builder {
        private Long idx;
        private Room room;
        private String recordUrl;

        public Builder() {}

        public Builder(Room room, String recordUrl){
            this.room = room;
            this.recordUrl = recordUrl;
        }

        public Video build() {
            return new Video(this);
        }
    }
}
