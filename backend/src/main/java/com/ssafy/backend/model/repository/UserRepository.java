package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    User findById(String id);

    @Modifying
    @Query("UPDATE User user SET user.password = :password WHERE user.id = :id")
    boolean updatePassword(String password, String id);
}
