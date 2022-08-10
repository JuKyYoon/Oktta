package com.ssafy.backend.model.dto.lol;

import java.util.List;

public class MatchDto {
    private String matchId;
    private int queueId;
    private int mapId;
    private String gameMode;
    private long gameStartTimestamp;
    private long gameEndTimestamp;

    private int matchRank;
    private List<ParticipantDto> participants;

    public MatchDto(String matchId, List<ParticipantDto> participants, String gameMode, long gameStartTimestamp, long gameEndTimestamp, int mapId, int queueId, int matchRank) {
        this.matchId = matchId;
        this.participants = participants;
        this.gameMode = gameMode;
        this.gameStartTimestamp = gameStartTimestamp;
        this.gameEndTimestamp = gameEndTimestamp;
        this.mapId = mapId;
        this.queueId = queueId;
        this.matchRank = matchRank;
    }

    public MatchDto() {
    }

    public long getGameEndTimestamp() {
        return gameEndTimestamp;
    }

    public void setGameEndTimestamp(long gameEndTimestamp) {
        this.gameEndTimestamp = gameEndTimestamp;
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

    public int getMatchRank() {
        return matchRank;
    }

    public void setMatchRank(int matchRank) {
        this.matchRank = matchRank;
    }

    @Override
    public String toString() {
        return "MatchDto{" +
                "matchId='" + matchId + '\'' +
                ", queueId=" + queueId +
                ", mapId=" + mapId +
                ", gameMode='" + gameMode + '\'' +
                ", gameStartTimestamp=" + gameStartTimestamp +
                ", gameEndTimestamp=" + gameEndTimestamp +
                ", matchRank=" + matchRank +
                ", participants=" + participants +
                '}';
    }
}
