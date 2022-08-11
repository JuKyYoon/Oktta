package com.ssafy.backend.model.dto.lol;

public class ParticipantDto {
    private int participantId;
    private int teamId;
    private String summonerId;
    private String summonerName;
    private String teamPosition;
    private int championId;
    private String championName;
    private int kills;
    private int assists;
    private int deaths;
    private String puuid;
    private boolean win;

    public ParticipantDto() {
    }

    public ParticipantDto(int assists, int championId, String championName, int deaths, int kills, int participantId, String puuid, String summonerId, String summonerName, String teamPosition, boolean win, int teamId) {
        this.assists = assists;
        this.championId = championId;
        this.championName = championName;
        this.deaths = deaths;
        this.kills = kills;
        this.participantId = participantId;
        this.puuid = puuid;
        this.summonerId = summonerId;
        this.summonerName = summonerName;
        this.teamPosition = teamPosition;
        this.win = win;
        this.teamId = teamId;
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

    public String getSummonerId() {
        return summonerId;
    }

    public void setSummonerId(String summonerId) {
        this.summonerId = summonerId;
    }

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    @Override
    public String toString() {
        return "ParticipantDto{" +
                "assists=" + assists +
                ", championId=" + championId +
                ", championName='" + championName + '\'' +
                ", deaths=" + deaths +
                ", kills=" + kills +
                ", participantId=" + participantId +
                ", puuid='" + puuid + '\'' +
                ", summonerId='" + summonerId + '\'' +
                ", summonerName='" + summonerName + '\'' +
                ", teamPosition='" + teamPosition + '\'' +
                ", win=" + win +
                ", teamId=" + teamId +
                '}';
    }
}
