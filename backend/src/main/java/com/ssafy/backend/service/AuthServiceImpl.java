package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.security.JwtProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtProvider jwtProvider, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
    }


    /**
     * 로그인
     */
    @Override
    public Map<String, String> signIn(UserDto signUser) {
        // 로그인 토큰을 생성한다.
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(signUser.getId(), signUser.getPassword());

        // 로그인 토큰 이용해, UserDetailsService가 요청을 받아 처리한다. 리턴값은 인증 객체로, 토큰 생성에 사용하낟.
        Authentication authentication = authenticationManager.authenticate(token);
        return createToken(authentication.getName());
    }

    @Override
    public Map<String, String> refresh(HttpServletRequest req, String userId, String refreshToken) {
        userRepository.findById(userId).orElseThrow(() ->
                new UserNotFoundException("Not Found User"));
        if (jwtProvider.validateToken(req, refreshToken) && jwtProvider.checkRefreshToken(userId, refreshToken)) {
            return createToken(userId);
        } else {
            String exception = (String) req.getAttribute("exception");
            Map<String, String> result = new HashMap<>();
            if("ExpiredJwtException".equals(exception)) {
                result.put("fail", "timeover");
            } else {
                result.put("fail", "fail");
            }
            return result;
        }
    }

    private Map<String, String> createToken(String userId) {
        Map<String, String> result = new HashMap<>();

        String accessToken = jwtProvider.generateAccessToken(userId);
        String refreshToken = jwtProvider.generateRefreshToken(userId);

        result.put("accessToken", accessToken);
        
        // 줄 필요 없음
        // result.put("refreshToken", refreshToken);

        return result;
    }



}
