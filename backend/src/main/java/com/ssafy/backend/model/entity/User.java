package com.ssafy.backend.model.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
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
    @Column(name="idx", columnDefinition = "LONG UNSIGNED")
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

    @Column(name = "profile_img")
    private int profileImg;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    // 외부로부터 접근권한 최소화.
    // 프록시 생성위해 생성자 사용
    protected User() {
    }

    private User(Builder builder) {
        this.id = builder.id;
        this.nickname = builder.nickname;
        this.password = builder.password;
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

    public int getProfileImg() {
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

    public static User.Builder builder() {
        return new User.Builder();
    }

    // Builder 패턴 ( Not Lombok )
    public static class Builder {

        private String id;
        private String nickname;
        private String password;
        private UserRole role;

        // Optional Parameter
        public Builder role(String role) {
            this.role = UserRole.valueOf(role);
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

        public User build() {
            return new User(this);
        }
    }
}
