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

    @Column(unique = true, nullable = false)
    private String puuid;

    //region 어떻게 얻어올 것 인가?..

    @Column(nullable = false)
    private int tier;

    @Column(name = "account_id", nullable = false)
    private String accountId;

    @Column(name = "summoner_name", nullable = false)
    private String summonerName;

    @CreatedDate
    @Column(name = "create_date")
    private LocalDateTime createDate;

    protected LolAuth(){}

    private LolAuth(Builder builder){
        this.userId = builder.userId;
        this.puuid = builder.puuid;
        this.tier = builder.tier;
        this.accountId = builder.accountId;
        this.summonerName = builder.summonerName;
        this.createDate = builder.createDate;
    }

    public static class Builder {
        private final String userId;
        private final String puuid;
//        private final String
        private final int tier;
        private final String accountId;
        private final String summonerName;
        private final LocalDateTime createDate;

        public Builder(String userId, String puuid, int tier, String accountId, String summonerName, LocalDateTime createDate) {
            this.userId = userId;
            this.puuid = puuid;
            this.tier = tier;
            this.accountId = accountId;
            this.summonerName = summonerName;
            this.createDate = createDate;
        }

        public LolAuth build() { return new LolAuth(this); }
    }

}
