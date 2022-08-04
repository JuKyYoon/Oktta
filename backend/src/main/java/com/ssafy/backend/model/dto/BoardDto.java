package com.ssafy.backend.model.dto;

import com.ssafy.backend.model.entity.Board;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema
public class BoardDto {
    private Long idx;
    private String nickname;
    private String title;
    private String content;
    private String createDate;
    private String modifyDate;
    private int category;
    private Long hit;

    public BoardDto(){

    }

    public BoardDto(String nickname, Long idx, String title, String createDate, Long hit){
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
        this.createDate = board.getCreateDate().toString();
        this.modifyDate = board.getModifyDate().toString();
        this.category = board.getCategory();
        this.hit = board.getHit() + 1;
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

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(String modifyDate) {
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
}
