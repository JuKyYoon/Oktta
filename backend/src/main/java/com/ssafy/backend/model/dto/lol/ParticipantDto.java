package com.ssafy.backend.model.dto.lol;

public class ParticipantDto {
    private int assists;
    private int championId;
    private String championName;
    private int deaths;
    private String individualPosition;
    private int kills;
    private int participantId;
    private String puuid;
    private String role;
    private String riotIdName;
    private String riotIdTagline;
    private String summonerName;
    private String teamPosition;
    private boolean win;

    public ParticipantDto() {
    }

    public ParticipantDto(int assists, int championId, String championName, int deaths, String individualPosition, int kills, int participantId, String puuid, String role, String riotIdName, String riotIdTagline, String summonerName, String teamPosition, boolean win) {
        this.assists = assists;
        this.championId = championId;
        this.championName = championName;
        this.deaths = deaths;
        this.individualPosition = individualPosition;
        this.kills = kills;
        this.participantId = participantId;
        this.puuid = puuid;
        this.role = role;
        this.riotIdName = riotIdName;
        this.riotIdTagline = riotIdTagline;
        this.summonerName = summonerName;
        this.teamPosition = teamPosition;
        this.win = win;
    }

    public int getAssists() {
        return assists;
    }

    public void setAssists(int assists) {
        this.assists = assists;
    }

    public int getChampionId() {
        return championId;
    }

    public void setChampionId(int championId) {
        this.championId = championId;
    }

    public String getChampionName() {
        return championName;
    }

    public void setChampionName(String championName) {
        this.championName = championName;
    }

    public int getDeaths() {
        return deaths;
    }

    public void setDeaths(int deaths) {
        this.deaths = deaths;
    }

    public String getIndividualPosition() {
        return individualPosition;
    }

    public void setIndividualPosition(String individualPosition) {
        this.individualPosition = individualPosition;
    }

    public int getKills() {
        return kills;
    }

    public void setKills(int kills) {
        this.kills = kills;
    }

    public int getParticipantId() {
        return participantId;
    }

    public void setParticipantId(int participantId) {
        this.participantId = participantId;
    }

    public String getPuuid() {
        return puuid;
    }

    public void setPuuid(String puuid) {
        this.puuid = puuid;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getRiotIdName() {
        return riotIdName;
    }

    public void setRiotIdName(String riotIdName) {
        this.riotIdName = riotIdName;
    }

    public String getRiotIdTagline() {
        return riotIdTagline;
    }

    public void setRiotIdTagline(String riotIdTagline) {
        this.riotIdTagline = riotIdTagline;
    }

    public String getSummonerName() {
        return summonerName;
    }

    public void setSummonerName(String summonerName) {
        this.summonerName = summonerName;
    }

    public String getTeamPosition() {
        return teamPosition;
    }

    public void setTeamPosition(String teamPosition) {
        this.teamPosition = teamPosition;
    }

    public boolean isWin() {
        return win;
    }

    public void setWin(boolean win) {
        this.win = win;
    }

    @Override
    public String toString() {
        return "ParticipantDto{" +
                "assists=" + assists +
                ", championId=" + championId +
                ", championName='" + championName + '\'' +
                ", deaths=" + deaths +
                ", individualPosition='" + individualPosition + '\'' +
                ", kills=" + kills +
                ", participantId=" + participantId +
                ", puuid='" + puuid + '\'' +
                ", role='" + role + '\'' +
                ", riotIdName='" + riotIdName + '\'' +
                ", riotIdTagline='" + riotIdTagline + '\'' +
                ", summonerName='" + summonerName + '\'' +
                ", teamPosition='" + teamPosition + '\'' +
                ", win=" + win +
                '}';
    }
}
