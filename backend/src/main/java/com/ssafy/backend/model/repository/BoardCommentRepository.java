package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.BoardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

public interface BoardCommentRepository extends JpaRepository<BoardComment, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM board_comment WHERE board_idx = :boardIdx ORDER BY idx ASC")
    List<BoardComment> findCommentsByBoardIdxAndCategory(Long boardIdx);

    @Transactional
    @Modifying
    @Query("UPDATE BoardComment boardComment SET boardComment.content = :content WHERE boardComment.idx = :idx")
    int updateBoardComment(Long idx, String content);
}
