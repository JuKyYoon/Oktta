package com.ssafy.backend.model.entity;

import net.bytebuddy.asm.Advice;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class RoomComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT(20) UNSIGNED")
    private Long idx;

    @ManyToOne
    @JoinColumn(name = "room_idx", nullable = false)
    private Room room;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_idx", nullable = false)
    private User user;

    @JoinColumn(name = "content", nullable = false)
    private String content;

    @JoinColumn(name = "create_time", updatable = false)
    @CreatedDate
    private LocalDateTime createTime;

    public Long getIdx() {
        return idx;
    }

    public Room getRoom() {
        return room;
    }

    public User getUser() {
        return user;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public RoomComment(){
    }

    public RoomComment(Builder builder){
        this.room = builder.room;
        this.user = builder.user;
        this.content = builder.content;
    }

    public static class Builder {
        private final Room room;
        private final User user;
        private final String content;

        public Builder(Room room, User user, String content){
            this.room = room;
            this.user = user;
            this.content = content;
        }

        public RoomComment build() {
            return new RoomComment(this);
        }
    }
}
