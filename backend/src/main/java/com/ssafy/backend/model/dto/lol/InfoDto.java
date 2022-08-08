package com.ssafy.backend.model.dto.lol;

import java.util.List;

public class InfoDto {
    private String matchId;
    private List<ParticipantDto> participants;
    private String gameMode;
    private long gameStartTimestamp;
    private int mapId;
    private int queueId;
    private  List<TeamDto> teams;

    public InfoDto(String matchId, List<ParticipantDto> participants, String gameMode, long gameStartTimestamp, int mapId, int queueId, List<TeamDto> teams) {
        this.matchId = matchId;
        this.participants = participants;
        this.gameMode = gameMode;
        this.gameStartTimestamp = gameStartTimestamp;
        this.mapId = mapId;
        this.queueId = queueId;
        this.teams = teams;
    }

    public InfoDto() {
    }

    @Override
    public String toString() {
        return "GameDto{" +
                "matchId='" + matchId + '\'' +
                ", participants=" + participants +
                ", gameMode='" + gameMode + '\'' +
                ", gameStartTimestamp=" + gameStartTimestamp +
                ", mapId=" + mapId +
                ", queueId=" + queueId +
                ", teams=" + teams +
                '}';
    }

    public String getMatchId() {
        return matchId;
    }

    public void setMatchId(String matchId) {
        this.matchId = matchId;
    }

    public List<ParticipantDto> getParticipants() {
        return participants;
    }

    public void setParticipants(List<ParticipantDto> participants) {
        this.participants = participants;
    }

    public String getGameMode() {
        return gameMode;
    }

    public void setGameMode(String gameMode) {
        this.gameMode = gameMode;
    }

    public long getGameStartTimestamp() {
        return gameStartTimestamp;
    }

    public void setGameStartTimestamp(long gameStartTimestamp) {
        this.gameStartTimestamp = gameStartTimestamp;
    }

    public int getMapId() {
        return mapId;
    }

    public void setMapId(int mapId) {
        this.mapId = mapId;
    }

    public int getQueueId() {
        return queueId;
    }

    public void setQueueId(int queueId) {
        this.queueId = queueId;
    }

    public List<TeamDto> getTeams() {
        return teams;
    }

    public void setTeams(List<TeamDto> teams) {
        this.teams = teams;
    }
}
