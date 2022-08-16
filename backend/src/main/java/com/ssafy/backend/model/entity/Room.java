package com.ssafy.backend.model.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "room")
@DynamicInsert
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
public class Room {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idx", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long idx;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx")
    private User user;

    @Column(name="title", nullable = false)
    private String title;

    @Lob
    @Column(name="content", nullable = false)
    private String content;

    @Column(name = "create_date", updatable = false)
    @CreatedDate
    private LocalDateTime createDate;

    @Column(name = "modify_date")
    @LastModifiedDate
    private LocalDateTime modifyDate;

    @Column(name = "hit", columnDefinition = "integer default 0")
    private int hit;

    @Column(name = "live")
    private boolean live;

    @Column(name = "people", columnDefinition = "integer default 0")
    private int people;

    @ManyToOne(targetEntity = Match.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "match_id")
    private Match match;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<RoomComment> comments;

    @Column(name = "host_summoner_name")
    private String hostSummonerName;

    @Column(name = "host_team_id")
    private int hostTeamId;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Video> videos;

    public Long getIdx() {
        return idx;
    }

    public User getUser() {
        return user;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public LocalDateTime getModifyDate() {
        return modifyDate;
    }

    public int getHit() {
        return hit;
    }

    public boolean isLive() {
        return live;
    }

    public int getPeople() {
        return people;
    }

    public void createRoomLive() {
        this.live = true;
        this.people = 1;
    }

    public void enterRoomLive() {
        this.people += 1;
    }

    public void leaveRoomLive() {
        this.people -= 1;
    }

    public void closeRoomLive() {
        this.live = false;
        this.people = 0;
    }

    public Match getMatch(){
        return match;
    }

    public List<RoomComment> getComments() {
        return comments;
    }

    public String getHostSummonerName() {
        return hostSummonerName;
    }

    public int getHostTeamId() {
        return hostTeamId;
    }

    protected Room() {
    }

    private Room(Builder builder) {
        this.user = builder.user;
        this.title = builder.title;
        this.content = builder.content;
        this.match = builder.match;
        this.hostSummonerName = builder.hostSummonerName;
        this.hostTeamId = builder.hostTeamId;
    }

    public static Room.Builder builder() {
        return new Room.Builder();
    }

    public static class Builder {
        private long idx;
        private User user;
        private String title;
        private String content;
        private Match match;
        private String hostSummonerName;
        private int hostTeamId;

        public Room.Builder idx(long idx) {
            this.idx = idx;
            return this;
        }

        public Builder() {}

        public Builder(User user, String title, String content, Match match) {
            this.user = user;
            this.title = title;
            this.content = content;
            this.match = match;
        }

        public Builder(User user, String title, String content, Match match, String hostSummonerName, int hostTeamId) {
            this.user = user;
            this.title = title;
            this.content = content;
            this.match = match;
            this.hostSummonerName = hostSummonerName;
            this.hostTeamId = hostTeamId;
        }

        public Room build() {
            return new Room(this);
        }

    }
}
