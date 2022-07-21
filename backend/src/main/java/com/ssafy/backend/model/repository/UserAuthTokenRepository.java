package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.UserAuthToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAuthTokenRepository extends JpaRepository<UserAuthToken, String> {

    UserAuthToken findByUserId(String userId);
    UserAuthToken findByToken(String token);
}
