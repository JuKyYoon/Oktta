package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.security.JwtProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
    }


    /**
     * 로그인
     */
    @Override
    public String signIn(UserDto signUser) {
        // 아이디와 비밀번호로 인증 객체 생성
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(signUser.getId(), signUser.getPassword());

        Authentication authentication = authenticationManager.authenticate(token);

        // role 설정할지 생각하긴

        return jwtProvider.generateAccessToken(authentication);
    }

}
