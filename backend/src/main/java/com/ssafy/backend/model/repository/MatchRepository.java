package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, String> {

}
