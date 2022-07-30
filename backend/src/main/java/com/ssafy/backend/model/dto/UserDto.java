package com.ssafy.backend.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * 유저 객체
 * @author 이예찬
 */
@Schema
public class UserDto {
    private String id;
    private String nickname;
    private String password;
    private String createDate;
    private String modifyDate;
    private int snsType;
    private int profileImg;
    private boolean emailAuth;
    private String role;

    public UserDto() {
    }

    public UserDto(String id, String nickname, String password) {
        this.id = id;
        this.nickname = nickname;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public int getSnsType() {
        return snsType;
    }

    public void setSnsType(int snsType) {
        this.snsType = snsType;
    }

    public int getProfileImg() {
        return profileImg;
    }

    public void setProfileImg(int profileImg) {
        this.profileImg = profileImg;
    }

    public boolean isEmailAuth() {
        return emailAuth;
    }

    public void setEmailAuth(boolean emailAuth) {
        this.emailAuth = emailAuth;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
