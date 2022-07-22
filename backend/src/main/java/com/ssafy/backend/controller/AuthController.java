package com.ssafy.backend.controller;

import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.response.LoginResponse;
import com.ssafy.backend.model.response.MessageResponse;
import com.ssafy.backend.service.AuthService;
import com.ssafy.backend.util.SetCookie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;

    private final AuthService authService;

    private static final String REFRESHTOKEN_KEY = "refreshToken";

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Login
     * @param signUser { id, password }
     * @param response HttpServletResponse
     * @return { statusCode, message }
     */
    @PostMapping("/authorize")
    public ResponseEntity<BaseResponseBody> signIn(@RequestBody UserDto signUser, HttpServletResponse response) {
        Map<String, String> result = authService.signIn(signUser);
        SetCookie.setRefreshTokenCookie(response, result.get(REFRESHTOKEN_KEY));
        return ResponseEntity.status(200).body(LoginResponse.of(200, successMsg, result));
    }

    /**
     * AccessToken 재발급
     * @param userId 유저 아이디
     * @return { accessToken, refreshToken }
     */
    @GetMapping("/refresh/{id}")
    public ResponseEntity<BaseResponseBody> refreshToken(
            @PathVariable("id") String userId, HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        String refreshToken = "";

        if(cookies != null) {
            for(Cookie c : cookies ) {
                if(c.getName().equals(REFRESHTOKEN_KEY)) {
                    refreshToken = c.getValue().trim();
                }
            }
            if(refreshToken.length() == 0) {
                return ResponseEntity.status(200).body(MessageResponse.of(200, failMsg, "token not found"));
            } else {
                // RefreshToken 이 쿠키에 있는 경우
                SetCookie.deleteRefreshTokenCookie(response);
                Map<String, String> result = authService.refresh(request, userId, refreshToken);
                if("timeover".equals(result.get(failMsg))) {
                    LOGGER.debug("Token Expired");
                    return ResponseEntity.status(200).body(MessageResponse.of(200, failMsg, "time expired"));
                } else if(failMsg.equals(result.get(failMsg))) {
                    LOGGER.debug("Token Validate Fail");
                    return ResponseEntity.status(200).body(MessageResponse.of(200, failMsg, "token not validate"));
                } else {
                    LOGGER.debug("new Token Success");
                    // 성공하면 새로운 쿠키 설정
                    SetCookie.setRefreshTokenCookie(response, result.get(REFRESHTOKEN_KEY));
                    return ResponseEntity.status(200).body(LoginResponse.of(200, successMsg, result));
                }
            }
        } else {
            return ResponseEntity.status(200).body(MessageResponse.of(200, failMsg, "token not found"));
        }
    }


}
