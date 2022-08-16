package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.Board;
import com.ssafy.backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findByIdx(Long idx);

    @Transactional
    @Modifying
    @Query("UPDATE Board board SET board.hit = board.hit+1 WHERE board.idx = :idx")
    int updateHit(Long idx);

    @Query(nativeQuery = true, value = "SELECT * FROM board WHERE category = :category ORDER BY idx DESC LIMIT :limit OFFSET :page")
    List<Board> findBoardsByCategory(int category, int limit, int page);

    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM board WHERE category = :category")
    int findLastPage(int category);

    @Transactional
    @Modifying
    @Query("UPDATE Board board SET board.title = :title, board.content = :content, board.modifyDate = :now WHERE board.idx = :idx")
    int updateBoard(Long idx, String title, String content, LocalDateTime now);

    List<Board> findAllByUser(User user);
}
