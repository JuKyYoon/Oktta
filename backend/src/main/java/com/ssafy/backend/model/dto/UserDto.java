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
    private String profileImg;
    private String role;
    private int tier;
    private String summonerName;
    public UserDto() {
    }

    public UserDto(String id, String nickname, String password) {
        this.id = id;
        this.nickname = nickname;
        this.password = password;
    }

    public UserDto(String nickname, String createDate, String modifyDate, String profileImg, int snsType, String role){
        this.nickname = nickname;
        this.createDate = createDate;
        this.modifyDate = modifyDate;
        this.profileImg = profileImg;
        this.snsType = snsType;
        this.role = role;
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

    public String getProfileImg() {
        return profileImg;
    }

    public void setProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getTier() {
        return tier;
    }

    public void setTier(int tier) {
        this.tier = tier;
    }

    public String getSummonerName() {
        return summonerName;
    }

    public void setSummonerName(String summonerName) {
        this.summonerName = summonerName;
    }
}
