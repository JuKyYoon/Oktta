package com.ssafy.backend.controller;

import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.response.LoginResponse;
import com.ssafy.backend.model.response.MessageResponse;
import com.ssafy.backend.service.AuthService;
import com.ssafy.backend.util.SetCookie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
    @PostMapping("")
    public ResponseEntity<BaseResponseBody> signIn(@RequestBody UserDto signUser, HttpServletResponse response) {
        Map<String, String> result = authService.signIn(signUser);
        SetCookie.setRefreshTokenCookie(response, result.get(REFRESHTOKEN_KEY));
        return ResponseEntity.status(200).body(LoginResponse.of(200, successMsg, result));
    }
    /**
     * Logout
     * @param request HttpServletRequest
     * @param response HttpServletResponse
     * @return { statusCode, message }
     */
    @DeleteMapping("")
    public ResponseEntity<BaseResponseBody> signOut(HttpServletRequest request, HttpServletResponse response){
        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Cookie[] cookies = request.getCookies();
        String refreshToken = "";
        if(cookies != null) {
            for (Cookie c : cookies) {
                if (c.getName().equals(REFRESHTOKEN_KEY)) {
                    refreshToken = c.getValue().trim();
                    break;
                }
            }
        }
        authService.signOut(request, principal.getUsername(), refreshToken);
        SetCookie.deleteRefreshTokenCookie(response);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    /**
     * AccessToken 재발급
     * @return { accessToken, refreshToken }
     */
    @GetMapping("/refresh")
    public ResponseEntity<BaseResponseBody> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        String refreshToken = "";

        if(cookies != null) {
            for(Cookie c : cookies ) {
                if(c.getName().equals(REFRESHTOKEN_KEY)) {
                    refreshToken = c.getValue().trim();
                    break;
                }
            }
            if(refreshToken.length() == 0) {
                return ResponseEntity.status(200).body(MessageResponse.of(200, failMsg, "token not found"));
            } else {
                // RefreshToken 이 쿠키에 있는 경우
                SetCookie.deleteRefreshTokenCookie(response);
                Map<String, String> result = authService.refresh(request, refreshToken);
                if("timeover".equals(result.get(failMsg))) {
                    LOGGER.debug("Token Expired");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(MessageResponse.of(401, failMsg, "time expired"));
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
