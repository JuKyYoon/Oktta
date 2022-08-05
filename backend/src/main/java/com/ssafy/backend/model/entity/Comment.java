package com.ssafy.backend.model.entity;


import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT(20) UNSIGNED")
    private Long idx;

    @ManyToOne(targetEntity = Board.class)
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

    @JoinColumn(name = "category", nullable = false)
    private int category;

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

    public int getCategory() {
        return category;
    }

    public Comment(){
    }

    public Comment(Builder builder){
        this.board = builder.board;
        this.user = builder.user;
        this.content = builder.content;
        this.category = builder.category;
    }

    public class Builder {
        private final Board board;
        private final User user;
        private final String content;
        private final int category;

        public Builder(Board board, User user, String content, int category){
            this.board = board;
            this.user = user;
            this.content = content;
            this.category = category;
        }

        public Comment build() {
            return new Comment(this);
        }
    }
}
