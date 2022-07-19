package com.ssafy.backend.service;

import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.repository.UserRepository;
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
    public User registUser(User user) {
        User tmp = userRepository.findById(user.getId());
        User newUser = null;
        if(tmp == null)
            newUser = userRepository.save(user);
        return newUser;
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
