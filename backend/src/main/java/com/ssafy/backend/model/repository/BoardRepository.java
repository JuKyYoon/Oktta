package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.dto.BoardDto;
import com.ssafy.backend.model.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findByIdx(Long idx);

    @Transactional
    @Modifying
    @Query("UPDATE Board board SET board.hit = board.hit+1 WHERE board.idx = :idx")
    int updateHit(Long idx);
}
