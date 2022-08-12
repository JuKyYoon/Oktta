package com.ssafy.backend.model.dto;

import com.ssafy.backend.model.dto.lol.MatchDto;
import com.ssafy.backend.model.entity.Match;

import java.time.LocalDateTime;

public class RoomDto {

    private Long idx;
    private String title;
    private String nickname;
    private String profileImage;
    private int tier;
    private String content;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
    private boolean live;
    private int people;
    private int hit;
    private VoteDto voteDto;
    private MatchDto matchDto;

    public RoomDto() {
    }

    public RoomDto(String nickname, Long idx, String title, LocalDateTime createDate, boolean live, int people, int hit){
        this.nickname = nickname;
        this.idx = idx;
        this.title = title;
        this.createDate = createDate;
        this.live = live;
        this.people = people;
        this.hit = hit;
    }

    public RoomDto(String nickname, Long idx, String title, LocalDateTime createDate, boolean live, int people, int hit, MatchDto matchDto){
        this.nickname = nickname;
        this.idx = idx;
        this.title = title;
        this.createDate = createDate;
        this.live = live;
        this.people = people;
        this.hit = hit;
        this.matchDto = matchDto;
    }

    public Long getIdx() {
        return idx;
    }

    public void setIdx(Long idx) {
        this.idx = idx;
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

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public boolean isLive() {
        return live;
    }

    public void setLive(boolean live) {
        this.live = live;
    }

    public int getPeople() {
        return people;
    }

    public void setPeople(int people) {
        this.people = people;
    }

    public int getHit() {
        return hit;
    }

    public void setHit(int hit) {
        this.hit = hit;
    }

    public VoteDto getVoteDto() {
        return voteDto;
    }

    public void setVoteDto(VoteDto voteDto) {
        this.voteDto = voteDto;
    }
    public MatchDto getMatch() {
        return matchDto;
    }

    public void setMatch(MatchDto match) {
        this.matchDto = match;
    }

    public int getTier() {
        return tier;
    }

    public void setTier(int tier) {
        this.tier = tier;
    }

    public MatchDto getMatchDto() {
        return matchDto;
    }

    public void setMatchDto(MatchDto matchDto) {
        this.matchDto = matchDto;
    }
}
