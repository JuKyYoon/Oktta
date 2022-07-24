package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findByIdx(String idx);
}
