package com.ssafy.backend.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema
public class CommentDto {
    private String nickname;
    private String content;
    private LocalDateTime createTime;

    public CommentDto(){
    }

    public CommentDto(String nickname, String content, LocalDateTime createTime){
        this.nickname = nickname;
        this.content = content;
        this.createTime = createTime;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }
}
