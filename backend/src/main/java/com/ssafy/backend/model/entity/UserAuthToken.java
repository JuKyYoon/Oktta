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
public class UserAuthToken {
    @Id
    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(unique = true, nullable = false)
    private String token;

    @CreatedDate
    @Column(name = "create_date")
    private LocalDateTime createDate;

    @Column(name = "expire_date")
    private LocalDateTime expireDate;

    protected UserAuthToken(){}

    private UserAuthToken(Builder builder){
        this.userId = builder.userId;
        this.token = builder.token;
        this.createDate = builder.createDate;
        this.expireDate = builder.expireDate;
    }

    public String getUserId() {
        return userId;
    }

    public String getToken() {
        return token;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public LocalDateTime getExpireDate() {
        return expireDate;
    }

    public void updateToken(String token) {
        this.token = token;
    }

    public static class Builder {
        private final String userId;
        private final String token;
        private final LocalDateTime createDate;
        private final LocalDateTime expireDate;

        public Builder(String userId, String token, LocalDateTime createDate, LocalDateTime expireDate) {
            this.userId = userId;
            this.token = token;
            this.createDate = createDate;
            this.expireDate = expireDate;
        }

        public UserAuthToken build(){
            return new UserAuthToken(this);
        }
    }
}
