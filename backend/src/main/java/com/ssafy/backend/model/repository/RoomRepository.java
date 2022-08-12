package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.Match;
import com.ssafy.backend.model.entity.Room;
import com.ssafy.backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    // update와 delete에는 @Transactional 추가 필수
    // Modifying의 return은 void or int(Integer)만 가능
    @Transactional
    @Modifying
    @Query("UPDATE Room room SET room.title = :title, room.content = :content, room.modifyDate = :date, room.match = :match  WHERE room.idx = :idx and room.user = :user")
    int updateRoom(String title, String content, long idx, User user, LocalDateTime date, Match match);

    @Query(nativeQuery = true, value = "SELECT * FROM room ORDER BY idx DESC LIMIT :limit OFFSET :page")
    List<Room> findRooms(int limit, int page);

    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM room")
    int findLastPage();

    @Transactional
    @Modifying
    @Query("UPDATE Room room SET room.hit = room.hit+1 WHERE room.idx = :idx")
    int updateHit(Long idx);

    List<Room> findAllByUser(User user);

    @Query(nativeQuery = true, value = "SELECT * FROM room WHERE room.live = 1 ORDER BY room.people DESC LIMIT :limit OFFSET :page")
    List<Room> findLiveRoomList(int limit, int page);

    @Query(nativeQuery = true, value = "SELECT * FROM room WHERE room.live = 1 ORDER BY room.people DESC LIMIT 3")
    List<Room> findTopRoomList();
}
