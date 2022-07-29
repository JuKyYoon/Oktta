package com.ssafy.backend.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema
public class BoardDto {
    private Long userIdx;
    private String title;
    private String content;
    private String createDate;
    private String modifyDate;
    private int category;
    private long hit;

    public BoardDto(){

    }

    public BoardDto(String title, String content, int category) {
        this.title = title;
        this.content = content;
        this.category = category;
    }

    public Long getUserIdx() {
        return userIdx;
    }

    public void setUserIdx(String idx) {
        this.userIdx = userIdx;
    }

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

    public long getHit() {
        return hit;
    }

    public void setHit(long hit) {
        this.hit = hit;
    }
}
