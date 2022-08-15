package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.LolAuth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LolAuthRepository extends JpaRepository<LolAuth, String> {
    Optional<LolAuth> findById(String id);
    Optional<LolAuth> findByUserId(String userId);
}
