package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.PasswordDto;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.User;

import javax.mail.MessagingException;

public interface UserService {
    void registUser(UserDto user) throws MessagingException;
    void modifyUser(User user, UserDto changeUser);
    User findUser(String id);
    boolean checkDuplicatedID(String userId);
    boolean checkDuplicatedNickName(String nickName);
    void deleteUser(User user, String password);
    User findPassword(User user);
    void authUser(String authKey);
    void resendAuthMail(String userId) throws MessagingException;
    int modifyPassword(String id, PasswordDto passwords);
    UserDto setUserInfo(User user);
}
