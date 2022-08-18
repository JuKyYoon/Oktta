package com.ssafy.backend.model.dto;

import com.ssafy.backend.model.entity.Board;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

public class BoardDto {
    private Long idx;
    private String nickname;
    private String profileImage;
    private String title;
    private String content;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
    private int category;
    private Long hit;

    public BoardDto(){

    }

    public BoardDto(String nickname, Long idx, String title, LocalDateTime createDate, Long hit){
        this.nickname = nickname;
        this.idx = idx;
        this.title = title;
        this.createDate = createDate;
        this.hit = hit;
    }

    public BoardDto(String nickname, Board board) {
        this.nickname = nickname;
        this.idx = board.getIdx();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.createDate = board.getCreateDate();
        this.modifyDate = board.getModifyDate();
        this.category = board.getCategory();
        this.hit = board.getHit();
    }

    public Long getIdx() { return idx; }

    public void setIdx(Long idx) { this.idx = idx; }

    public String getNickname() { return nickname; }

    public void setString(String nickname) { this.nickname = nickname; }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public LocalDateTime getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(LocalDateTime modifyDate) {
        this.modifyDate = modifyDate;
    }

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }

    public Long getHit() {
        return hit;
    }

    public void setHit(long hit) {
        this.hit = hit;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
