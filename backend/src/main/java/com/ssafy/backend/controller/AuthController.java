package com.ssafy.backend.controller;

import com.ssafy.backend.model.BaseResponseBody;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.security.JwtProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    public AuthController(AuthenticationManager authenticationManager, JwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody UserDto signUser, HttpServletResponse response) {
        logger.debug(signUser.getId());
        logger.debug(signUser.getPassword());

        try {
            // 아이디와 비밀번호로 인증 객체 생성
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(signUser.getId(), signUser.getPassword());

            Authentication authentication = authenticationManager.authenticate(token);

            String accessToken = jwtProvider.generateAccessToken(authentication);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, accessToken));


        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "fail"));

        }


    }


}
