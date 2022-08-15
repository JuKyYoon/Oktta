package com.ssafy.backend.model.entity;

import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class BoardComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT(20) UNSIGNED")
    private Long idx;

    @ManyToOne
    @JoinColumn(name = "board_idx", nullable = false)
    private Board board;

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

    public Board getBoard() {
        return board;
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

    public BoardComment(){
    }

    public BoardComment(Builder builder){
        this.board = builder.board;
        this.user = builder.user;
        this.content = builder.content;
    }

    public static class Builder {
        private final Board board;
        private final User user;
        private final String content;

        public Builder(Board board, User user, String content){
            this.board = board;
            this.user = user;
            this.content = content;
        }

        public BoardComment build() {
            return new BoardComment(this);
        }
    }
}
