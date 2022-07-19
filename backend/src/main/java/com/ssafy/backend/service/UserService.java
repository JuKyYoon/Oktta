package com.ssafy.backend.service;

import com.ssafy.backend.model.entity.User;

import java.sql.SQLException;

public interface UserService {
    public User loginUser(User user) throws SQLException;
    public User registUser(User user);
    public int modifyUser(User user) throws  SQLException;
    public User findUser(String id) throws  SQLException;
    public int checkDuplicatedID(String id) throws SQLException;

    public int deleteUser(String id) throws SQLException;

    public User findPassword(User user) throws  SQLException;
}
