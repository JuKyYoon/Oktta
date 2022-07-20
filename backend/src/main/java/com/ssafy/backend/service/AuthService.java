package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.UserDto;

public interface AuthService {
    public String signIn(UserDto signUser);
}