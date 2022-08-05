package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.Board;
import com.ssafy.backend.model.entity.Room;
import com.ssafy.backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByIdx(Long idx);

    // update와 delete에는 @Transactional 추가 필수
    // Modifying의 return은 void or int(Integer)만 가능
    @Transactional
    @Modifying
    @Query("UPDATE Room room SET room.title = :title, room.content = :content, room.modifyDate = :date  WHERE room.idx = :idx and room.user = :user")
    int updateRoom(String title, String content, long idx, User user, LocalDateTime date);

    @Query(nativeQuery = true, value = "SELECT * FROM room LIMIT :limit OFFSET :page")
    List<Room> findRooms(int limit, int page);

    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM room")
    int findLastPage();

    @Transactional
    @Modifying
    @Query("UPDATE Room room SET room.hit = room.hit+1 WHERE room.idx = :idx")
    int updateHit(Long idx);
}