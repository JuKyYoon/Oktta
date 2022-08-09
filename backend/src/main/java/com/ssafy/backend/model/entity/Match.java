package com.ssafy.backend.model.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Match Entity
 */
@Entity
@Table(name = "matchdata")
@DynamicInsert
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
public class Match {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name="idx", columnDefinition = "BIGINT(20) UNSIGNED")
//    private Long idx;

    @Id
    @Column(name = "match_id", unique = true, nullable = false)
    private String matchId;

    @Column(name = "game_mode", nullable = false)
    private String gameMode;

    @Column(name = "participant_id", nullable = false)
    private String participantId;

    @Column(name = "team_id", nullable = false)
    private String teamId;

    @Column(name = "champion_id", nullable = false)
    private String championId;

    @Column(name = "champion_name", nullable = false)
    private String championName;

    @Column(name = "summoner_id", nullable = false, columnDefinition = "text")
    private String summonerId;

    @Column(name = "summoner_name", nullable = false)
    private String summonerName;

    @Column(name = "match_date", nullable = false)
    private LocalDateTime matchDate;

    @Column(name = "match_tier", columnDefinition = "int default 0")
    private int matchTier;

    @Column(name = "team_position", nullable = false)
    private String teamPosition;
    @Column(name = "user_kill", nullable = false)
    private String kill;
    @Column(name = "user_assist", nullable = false)
    private String assist;
    @Column(name = "user_death", nullable = false)
    private String death;
    @Column(name = "puuid", nullable = false, columnDefinition = "text")
    private String puuid;
    @Column(name = "user_win", nullable = false)
    private String win;
    protected Match(){
    }

    private Match(Builder builder){
        this.matchId = builder.matchId;
        this.gameMode = builder.gameMode;
        this.participantId = builder.participantId;
        this.teamId = builder.teamId;
        this.championId = builder.championId;
        this.championName = builder.championName;
        this.summonerId = builder.summonerId;
        this.summonerName = builder.summonerName;
        this.teamPosition = builder.teamPosition;
        this.matchDate = builder.matchDate;
        this.matchTier = builder.matchTier;
        this.kill = builder.kill;
        this.assist = builder.assist;
        this.death = builder.death;
        this.puuid = builder.puuid;
        this.win = builder.win;
    }

//    public Long getIdx() {
//        return idx;
//    }

    public String getMatchId() {
        return matchId;
    }

    public String getChampionId() {
        return championId;
    }

    public String getChampionName() {
        return championName;
    }

    public String getSummonerId() {
        return summonerId;
    }

    public String getSummonerName() {
        return summonerName;
    }

    public LocalDateTime getMatchDate() {
        return matchDate;
    }

    public int getMatchTier() {
        return matchTier;
    }

    public String getParticipantId() {
        return participantId;
    }

    public String getTeamId() {
        return teamId;
    }

    public String getKill() {
        return kill;
    }

    public String getAssist() {
        return assist;
    }

    public String getDeath() {
        return death;
    }

    public String getPuuid() {
        return puuid;
    }

    public String getWin() {
        return win;
    }

    public String getTeamPosition() {
        return teamPosition;
    }

    public String getGameMode() {
        return gameMode;
    }

    public static Match.Builder builder() {
        return new Match.Builder();
    };

    public static class Builder {
        private String matchId;
        private String gameMode;
        private String participantId;
        private String teamId;
        private String championId;
        private String championName;
        private String summonerId;
        private String summonerName;
        private String teamPosition;
        private LocalDateTime matchDate;
        private int matchTier;
        private String kill;
        private String assist;
        private String death;
        private String puuid;
        private String win;

        public Builder() {}

        public Builder(String participantId, String gameMode, String teamId, String matchId, String championId, String championName, String summonerId, String summonerName, LocalDateTime matchDate, int matchTier, String kill, String assist, String death, String puuid, String win, String teamPosition){
            this.matchId = matchId;
            this.gameMode = gameMode;
            this.participantId = participantId;
            this.teamId = teamId;
            this.championId = championId;
            this.championName = championName;
            this.summonerId = summonerId;
            this.summonerName = summonerName;
            this.teamPosition = teamPosition;
            this.matchDate = matchDate;
            this.matchTier = matchTier;
            this.kill = kill;
            this.assist = assist;
            this.death = death;
            this.puuid = puuid;
            this.win = win;
        }

        public Match build(){
            return new Match(this);
        }
    }
}
