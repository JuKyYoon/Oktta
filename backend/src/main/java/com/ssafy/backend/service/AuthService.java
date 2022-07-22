package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.UserDto;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface AuthService {
    public Map<String, String> signIn(UserDto signUser);
    public Map<String, String> refresh(HttpServletRequest req, String userId, String refreshToken);
}