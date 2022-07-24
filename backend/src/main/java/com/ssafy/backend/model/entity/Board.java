package com.ssafy.backend.model.entity;

import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "LONG UNSIGNED")
    private Long idx;

    @Column(name = "user_idx", nullable = false)
    private Long userIdx;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(name = "create_date", updatable = false)
    @CreatedDate
    private LocalDateTime createDate;

    @Column(name = "modify_date")
    @LastModifiedDate
    private LocalDateTime modifyDate;

    private int category;

    private Long hit;

    protected Board() {
    }

    private Board(Builder builder){
        this.userIdx = builder.userIdx;
        this.title = builder.title;
        this.content = builder.content;
        this.category = builder.category;
    }

    public static class Builder {
        // Required Parameter

        private final Long userIdx;
        private final String title;
        private final String content;
        private final int category;

        // Optional Parameter

        public Builder(Long userIdx, String title, String content, int category) {
            this.userIdx = userIdx;
            this.title = title;
            this.content = content;
            this.category = category;
        }

        public Board build() {
            return new Board(this);
        }
    }
}
