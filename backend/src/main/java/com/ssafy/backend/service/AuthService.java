package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.UserDto;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface AuthService {
    Map<String, String> signIn(UserDto signUser);
    Map<String, String> refresh(HttpServletRequest req, String refreshToken);
    void signOut(HttpServletRequest req, String userId, String refreshToken);
}