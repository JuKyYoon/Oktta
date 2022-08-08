package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.BoardComment;
import com.ssafy.backend.model.entity.RoomComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface RoomCommentRepository extends JpaRepository<RoomComment, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM room_comment WHERE room_idx = :roomIdx ORDER BY idx ASC")
    List<RoomComment> findCommentsByRoomIdx(Long roomIdx);

    @Transactional
    @Modifying
    @Query("UPDATE RoomComment roomComment SET roomComment.content = :content WHERE roomComment.idx = :idx")
    int updateBoardComment(Long idx, String content);
}
