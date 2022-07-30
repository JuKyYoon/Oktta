package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.PasswordDto;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.User;

import javax.mail.MessagingException;

public interface UserService {
    User loginUser(User user);
    void registUser(UserDto user) throws MessagingException;
    void modifyUser(User user, UserDto changeUser);
    User findUser(String id);
    boolean checkDuplicatedID(String userId);
    boolean checkDuplicatedNickName(String nickName);
    void deleteUser(User user, String password);
    User findPassword(User user);
    public void authUser(String authKey);
    public void resendAuthMail(String userId) throws MessagingException;
    public int modifyPassword(String id, PasswordDto passwords);
}
