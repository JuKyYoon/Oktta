package com.ssafy.backend.model.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
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

    protected Match(){
    }

    private Match(Builder builder){
        this.matchId = builder.matchId;
        this.championId = builder.championId;
        this.championName = builder.championName;
        this.summonerId = builder.summonerId;
        this.summonerName = builder.summonerName;
        this.matchDate = builder.matchDate;
        this.matchTier = builder.matchTier;
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

    public static Match.Builder builder() {
        return new Match.Builder();
    };

    public static class Builder {
        private String matchId;
        private String championId;
        private String championName;
        private String summonerId;
        private String summonerName;
        private LocalDateTime matchDate;
        private int matchTier;

        public Builder() {}

        public Builder(String matchId, String championId, String championName, String summonerId, String summonerName, LocalDateTime matchDate, int matchTier){
            this.matchId = matchId;
            this.championId = championId;
            this.championName = championName;
            this.summonerId = summonerId;
            this.summonerName = summonerName;
            this.matchDate = matchDate;
            this.matchTier = matchTier;
        }

        public Match build(){
            return new Match(this);
        }
    }
}
