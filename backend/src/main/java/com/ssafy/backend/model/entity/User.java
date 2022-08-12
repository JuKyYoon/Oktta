package com.ssafy.backend.model.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * User Entity
 * @author 윤주경
 */
@Entity
@Table
@DynamicInsert
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idx", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long idx;

    @Column(unique = true, nullable = false)
    private String id;

    @Column(name="nickname", unique = true, nullable = false)
    private String nickname;

    @Column(name="password")
    private String password;

    @Column(name = "create_date", updatable = false)
    @CreatedDate
    private LocalDateTime createDate;

    @Column(name = "modify_date")
    @LastModifiedDate
    private LocalDateTime modifyDate;

    @Column(name = "sns_type")
    private int snsType;

    @Column(name = "profile_img", columnDefinition = "varchar(255) default 'https://oktta.s3.us-east-2.amazonaws.com/defaultProfile.png'")
    private String profileImg;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(255) default 'ROLE_GUEST'")
    private UserRole role;

    // 외부로부터 접근권한 최소화.
    // 프록시 생성위해 생성자 사용
    protected User() {
    }

    private User(Builder builder) {
        this.id = builder.id;
        this.nickname = builder.nickname;
        this.password = builder.password;
        this.role = builder.role;
        this.snsType = builder.snsType;
        this.profileImg = builder.profileImg;
    }

    public Long getIdx() {
        return idx;
    }

    public String getId() {
        return id;
    }

    public String getNickname() {
        return nickname;
    }

    public String getPassword() {
        return password;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public LocalDateTime getModifyDate() {
        return modifyDate;
    }

    public int getSnsType() {
        return snsType;
    }

    public String getProfileImg() {
        return profileImg;
    }

    public UserRole getRole() {
        return role;
    }

    public void updateInfo(String nickname) {
        this.nickname = nickname;
    }

    public void updateUserRole(UserRole role){
        this.role = role;
    }

    public void deleteUser(){
        this.id = String.valueOf(this.idx);
        this.nickname = "deleteuser" + this.idx;
        this.password = null;
        this.snsType = -1;
        this.profileImg = null;
        this.role = UserRole.ROLE_GUEST;
    }

    public static User.Builder builder() {
        return new User.Builder();
    }
    // Builder 패턴 ( Not Lombok )
    public static class Builder {

        private String id;
        private String nickname;
        private String password;
        private UserRole role;
        private int snsType;
        private String profileImg;

        // Optional Parameter
        public Builder role(String role) {
            this.role = UserRole.valueOf(role);
            return this;
        }

        public Builder profileImg(String profileImg){
            this.profileImg = profileImg;
            return this;
        }

        // Because of MapStruct
        public Builder() {}

        // Required Parameter
        public Builder(String id, String nickname, String password) {
            this.id = id;
            this.nickname = nickname;
            this.password = password;
        }

        public Builder(String id, String nickname, UserRole role, int snsType){
            this.id = id;
            this.nickname = nickname;
            this.role = role;
            this.snsType = snsType;
        }
        public Builder(String id, String nickname, String password, String profileImg){
            this.id = id;
            this.nickname = nickname;
            this.password = password;
            this.profileImg = profileImg;
        }
        public User build() {
            return new User(this);
        }
    }
}
