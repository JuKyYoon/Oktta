package com.ssafy.backend.model.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "room")
@DynamicInsert
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
public class Room {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idx", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long idx;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx", nullable = false)
    private User user;

    @Column(name="title", nullable = false)
    private String title;

    @Column(name="content", nullable = false)
    private String content;

    @Column(name = "create_date", updatable = false)
    @CreatedDate
    private LocalDateTime createDate;

    @Column(name = "modify_date")
    @LastModifiedDate
    private LocalDateTime modifyDate;

    @Column(name = "hit", columnDefinition = "integer default 0")
    private int hit;

    @Column(name = "live")
    private boolean live;

    @Column(name = "people", columnDefinition = "integer default 0")
    private int people;

    public Long getIdx() {
        return idx;
    }

    public User getUser() {
        return user;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public LocalDateTime getModifyDate() {
        return modifyDate;
    }

    public int getHit() {
        return hit;
    }

    public boolean isLive() {
        return live;
    }

    public int getPeople() {
        return people;
    }

    public void updateRoomState(boolean state) {
        this.live = state;
    }

    protected Room() {
    }

    private Room(Builder builder) {
        this.user = builder.user;
        this.title = builder.title;
        this.content = builder.content;
    }

    public static Room.Builder builder() {
        return new Room.Builder();
    }

    public static class Builder {
        private long idx;
        private User user;
        private String title;
        private String content;

        public Room.Builder idx(long idx) {
            this.idx = idx;
            return this;
        }

        public Builder() {}

        public Builder(User user, String title, String content) {
            this.user = user;
            this.title = title;
            this.content = content;
        }

        public Room build() {
            return new Room(this);
        }

    }
}
