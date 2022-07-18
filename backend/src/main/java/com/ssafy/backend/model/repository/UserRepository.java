package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
