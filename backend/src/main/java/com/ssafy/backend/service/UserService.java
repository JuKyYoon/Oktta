package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.PasswordDto;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.User;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;

public interface UserService {
    void registUser(UserDto user) throws MessagingException;
    void modifyUser(User user, UserDto changeUser);
    boolean checkDuplicatedID(String userId);
    boolean checkDuplicatedNickName(String nickName);
    void deleteUser(User user, String password);
    void findPassword(String email) throws MessagingException;
    void authUser(String authKey);
    void resendAuthMail(String userId) throws MessagingException;
    int modifyPassword(String id, PasswordDto passwords);
    UserDto setUserInfo(User user);
    String validateResetToken(String resetToken);
    boolean resetPassword(String password, String token);

    void registProfileImage(User user, MultipartFile multipartFile);

    void deleteProfileImage(User user);
}
