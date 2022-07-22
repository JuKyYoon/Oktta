package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.PasswordDto;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.User;

import java.sql.SQLException;

public interface UserService {
    public User loginUser(User user) throws SQLException;
    public boolean registUser(UserDto user) throws Exception;
    public int modifyUser(User user) throws  SQLException;
    public User findUser(String id) throws  SQLException;
    public int checkDuplicatedID(String id) throws SQLException;
    public int deleteUser(String id) throws SQLException;
    public User findPassword(User user) throws SQLException;
    public void authUser(String authKey) throws Exception;
    public boolean resendAuthMail(String userId) throws Exception;

    public User findPassword(User user) throws  SQLException;

    public int modifyPassword(String id, PasswordDto passwords) throws SQLException;
}
