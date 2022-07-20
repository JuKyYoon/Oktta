package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.repository.UserRepository;
import org.springframework.data.relational.core.sql.SQL;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

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
        return userRepository.findById(id);
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
}
