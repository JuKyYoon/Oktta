package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.LolAuth;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.repository.LolAuthRepository;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.security.JwtProvider;
import com.ssafy.backend.util.RedisService;
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

    private final RedisService redisService;

    private final LolAuthRepository lolAuthRepository;

    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtProvider jwtProvider, UserRepository userRepository, RedisService redisService, LolAuthRepository lolAuthRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
        this.redisService = redisService;
        this.lolAuthRepository = lolAuthRepository;
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
        Map<String, String> result = createToken(authentication.getName());

        User user = userRepository.findById(authentication.getName()).orElseThrow(
                () -> new UserNotFoundException("User not Found in SignIn")
        );
        result.put("nickname", user.getNickname());
        result.put("auth", user.getRole().getValue().equals("ROLE_USER") ? "1": "0");

        result.put("tier", "");
        result.put("summonerName", "");
        LolAuth lolAuth = lolAuthRepository.findByUserId(user.getId()).orElse(null);
        if(lolAuth != null){
            result.put("tier", String.valueOf(lolAuth.getTier()));
            result.put("summonerName", lolAuth.getSummonerName());
        }

        return result;
    }

    /**
     * accessToken 및 refreshToken 을 재발급한다.
     * @param req
     * @param userId
     * @param refreshToken
     * @return
     */
    @Override
    public Map<String, String> refresh(HttpServletRequest req, String refreshToken) {
        String userId = redisService.getStringValue(refreshToken);

        if (userId != null && jwtProvider.validateToken(req, refreshToken)) {
            userRepository.findById(userId).orElseThrow(
                    () ->  new UserNotFoundException("Not Found User")
            );
            // 연속으로 접근 시, refresh 토큰을 찾지 못함
//            redisService.deleteKey(refreshToken);
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
     * 로그아웃
     * @param req
     * @param userId
     * @return
     */
    @Override
    public void signOut(HttpServletRequest req, String userId, String refreshToken) {
        // Redis에서 refreshToken 존재하면 삭제
        redisService.deleteKey(refreshToken);

        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );
        String accessToken = jwtProvider.resolveToken(req);
        if(accessToken != null) {
            // accesstoken 블랙리스트로 redis 등록
            long expireTime = jwtProvider.getAccessTokenExpireTime();
            redisService.setTokenBlackList(accessToken, "logout", expireTime);
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
