package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.PasswordDto;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public User loginUser(User user) throws SQLException {
        return null;
    }

    @Override
    public boolean registUser(UserDto user) throws SQLException {
        String encrypt = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()); // 10라운드
        userRepository.save(new User.Builder(user.getId(), user.getNickname(), encrypt).build());
        return true;
    }

    @Override
    public int modifyUser(User user) throws SQLException {
        return 0;
    }

    @Override
    public User findUser(String id) throws SQLException {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public int checkDuplicatedID(String id) throws SQLException {
        return 0;
    }

    @Override
    public int deleteUser(String id) throws SQLException {
        return 0;
    }

    @Override
    public User findPassword(User user) throws SQLException {
        return null;
    }

    @Override
    public int modifyPassword(String id, PasswordDto passwords) throws SQLException {
        User user = userRepository.findById(id).orElse(null);
        String oldPassword = passwords.getOldPassword();
        String newPassword = passwords.getNewPassword();

        // 기존 비밀번호가 맞지 않을 경우 false
        if(!BCrypt.checkpw(oldPassword, user.getPassword()))
            return -1;
        else {

            // 새로운 비밀번호로 저장
            String encrypt = BCrypt.hashpw(newPassword, BCrypt.gensalt());
            return userRepository.updatePassword(encrypt, user.getId());
        }
    }
}
