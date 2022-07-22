package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.PasswordDto;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.User;

import javax.mail.MessagingException;

public interface UserService {
    User loginUser(User user);
    boolean registUser(UserDto user) throws MessagingException;
    int modifyUser(User user);
    User findUser(String id);
    int checkDuplicatedID(String id);
    int deleteUser(String id);
    User findPassword(User user);
    public void authUser(String authKey);
    public boolean resendAuthMail(String userId) throws MessagingException;
    public int modifyPassword(String id, PasswordDto passwords);
}
