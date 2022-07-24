package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.UserDto;
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

/**
 * 인증과 관련된 서비스를 수행
 */
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
     * @param { id, password }
     */
    @Override
    public Map<String, String> signIn(UserDto signUser) {
        // 로그인을 시도할 토큰을 생성한다.
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(signUser.getId(), signUser.getPassword());

        // 위에서 만든 토큰을 이용해 인증한다, UserDetailsService 가 요청을 받아 처리한다. 리턴값은 인증 객체로, 토큰 생성에 사용한다.
        Authentication authentication = authenticationManager.authenticate(token);
        return createToken(authentication.getName());
    }

    /**
     * accessToken 및 refreshToken 을 재발급한다.
     * @param req
     * @param userId
     * @param refreshToken
     * @return
     */
    @Override
    public Map<String, String> refresh(HttpServletRequest req, String userId, String refreshToken) {
        userRepository.findById(userId).orElseThrow(
                () ->  new UserNotFoundException("Not Found User")
        );

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

    /**
     * 유저 아이디로 JWT 토큰을 만든다.
     * @param userId 유저아이디 ( = 이메일 )
     * @return { accessToken, refreshToken }
     */
    private Map<String, String> createToken(String userId) {
        Map<String, String> result = new HashMap<>();

        String accessToken = jwtProvider.generateAccessToken(userId);
        String refreshToken = jwtProvider.generateRefreshToken(userId);

        result.put("accessToken", accessToken);
        result.put("refreshToken", refreshToken);

        return result;
    }



}
