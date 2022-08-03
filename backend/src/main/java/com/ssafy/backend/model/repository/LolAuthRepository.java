package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.LolAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LolAuthRepository extends JpaRepository<LolAuth, String> {

}
