package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import javax.transaction.Transactional;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(String id);

    Optional<User> findByNickname(String nickname);

    @Query("SELECT user.nickname FROM User user WHERE user.idx = :idx")
    String findNicknameByIdx(Long idx);

    // update와 delete에는 @Transactional 추가 필수
    // Modifying의 return은 void or int(Integer)만 가능
    @Transactional
    @Modifying
    @Query("UPDATE User user SET user.password = :password WHERE user.id = :id")
    int updatePassword(String password, String id);

    @Transactional
    @Modifying
    @Query("UPDATE User user SET user.profileImg = :path WHERE user.idx = :idx")
    void updateProfileImage(Long idx, String path);
}
