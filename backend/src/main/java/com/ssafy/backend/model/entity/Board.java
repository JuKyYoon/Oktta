package com.ssafy.backend.model.entity;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT(20) UNSIGNED")
    private Long idx;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_idx", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "create_date", updatable = false)
    @CreatedDate
    private LocalDateTime createDate;

    @Column(name = "modify_date")
    @LastModifiedDate
    private LocalDateTime modifyDate;

    @Column(name = "category")
    private int category;

    @Column(name = "hit")
    @ColumnDefault("0")
    private Long hit;


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

    public int getCategory() {
        return category;
    }

    public Long getHit() {
        return hit;
    }

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<BoardComment> comments;

    protected Board() {
    }

    private Board(Builder builder){
        this.user = builder.user;
        this.title = builder.title;
        this.content = builder.content;
        this.category = builder.category;
    }

    public static class Builder {
        // Required Parameter

        private final User user;
        private final String title;
        private final String content;
        private final int category;
        private Match match;

        // Optional Parameter

        public Builder(User user, String title, String content, int category) {
            this.user = user;
            this.title = title;
            this.content = content;
            this.category = category;
        }

        public Board build() {
            return new Board(this);
        }
    }
}
