package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM comment WHERE board_idx = :boardIdx AND category = :category ORDER BY idx ASC")
    List<Comment> findCommentsByBoardIdxAndCategory(Long boardIdx, int category);
}
