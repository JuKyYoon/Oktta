package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.Room;
import com.ssafy.backend.model.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {

    @Query("SELECT video.recordUrl FROM Video video WHERE video.room = :room ORDER BY video.idx ASC")
   List<String> findRecordUrlByRoom(Room room);
}
