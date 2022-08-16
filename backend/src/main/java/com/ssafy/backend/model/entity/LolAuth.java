package com.ssafy.backend.model.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
@DynamicInsert
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
public class LolAuth {

    @Id
    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(nullable = false)
    private String puuid;

    @Column(nullable = false)
    private int tier;

    @Column(name = "account_id", nullable = false)
    private String accountId;

    @Column(name = "summoner_name", nullable = false)
    private String summonerName;

    @CreatedDate
    @Column(name = "create_date", updatable = false)
    private LocalDateTime createDate;


    public String getUserId() {
        return userId;
    }

    public String getPuuid() {
        return puuid;
    }

    public int getTier() {
        return tier;
    }

    public String getAccountId() {
        return accountId;
    }

    public String getSummonerName() {
        return summonerName;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    protected LolAuth(){}

    private LolAuth(Builder builder){
        this.userId = builder.userId;
        this.puuid = builder.puuid;
        this.tier = builder.tier;
        this.accountId = builder.accountId;
        this.summonerName = builder.summonerName;
    }

    public static class Builder {
        private final String userId;
        private final String puuid;
//        private final String
        private final int tier;
        private final String accountId;
        private final String summonerName;

        public Builder(String userId, String puuid, int tier, String accountId, String summonerName) {
            this.userId = userId;
            this.puuid = puuid;
            this.tier = tier;
            this.accountId = accountId;
            this.summonerName = summonerName;
        }

        public LolAuth build() { return new LolAuth(this); }
    }

}
