package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.PasswordDto;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.User;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.util.Map;

public interface UserService {
    boolean registUser(UserDto user, MultipartFile profileImage) throws MessagingException;
    boolean modifyUser(String userId, UserDto changeUser);
    boolean checkDuplicatedID(String userId);
    boolean checkDuplicatedNickName(String nickName);
    void deleteUser(String userId, String password);
    void findPassword(String email) throws MessagingException;
    void authUser(String authKey);
    void resendAuthMail(String userId) throws MessagingException;
    int modifyPassword(String id, PasswordDto passwords);
    UserDto setUserInfo(String userId);
    String validateResetToken(String resetToken);
    boolean resetPassword(String password, String token);
    void registProfileImage(String userId, MultipartFile multipartFile);
    void deleteProfileImage(String userId);
    Map<String, String> getMyTier(String userId);
}
