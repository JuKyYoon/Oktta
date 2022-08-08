package com.ssafy.backend.model.dto.lol;

public class TeamDto {
    private int teamId;
    private boolean win;

    public TeamDto() {
    }

    public TeamDto(int teamId, boolean win) {
        this.teamId = teamId;
        this.win = win;
    }

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    public boolean isWin() {
        return win;
    }

    public void setWin(boolean win) {
        this.win = win;
    }

    @Override
    public String toString() {
        return "TeamDto{" +
                "teamId=" + teamId +
                ", win=" + win +
                '}';
    }
}
