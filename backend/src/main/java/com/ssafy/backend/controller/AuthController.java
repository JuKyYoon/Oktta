package com.ssafy.backend.controller;

import com.ssafy.backend.model.exception.UserNotFoundException;
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
    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    @Value("${response.success}")
    private String SUCCESS_MSG;

    @Value("${response.fail}")
    private String FAIL_MSG;

    private String REFRESHTOKEN_KEY = "refreshToken";

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * 로그인
     * @param signUser 유저의 아이디, 비밀번호만 있다
     * @param response
     * @return
     */
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody UserDto signUser, HttpServletResponse response) {
        try {
            Map<String, String> result = authService.signIn(signUser);
            SetCookie.setRefreshTokenCookie(response, result.get(REFRESHTOKEN_KEY));
            return ResponseEntity.status(200).body(LoginResponse.of(200, SUCCESS_MSG, result));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, FAIL_MSG));
        }
    }

    @GetMapping("/refresh/{id}")
    public ResponseEntity<?> refreshToken(@PathVariable("id") String userId, HttpServletRequest request, HttpServletResponse response) {
        try {
            Cookie[] cookies = request.getCookies();
            String refreshToken = "";

            if(cookies != null){ // 만약 쿠키가 없으면 쿠키 생성
                for(Cookie c : cookies ) {
                    if(c.getName().equals("refreshToken")) {
                        refreshToken = c.getValue().trim();
                    }
                }
                if(refreshToken.length() == 0) {
                    return ResponseEntity.status(200).body(MessageResponse.of(200, FAIL_MSG, "token not found"));
                } else {
                    // RefreshToken 이 쿠키에 있는 경우
                    SetCookie.deleteRefreshTokenCookie(response);
                    Map<String, String> result = authService.refresh(request, userId, refreshToken);
                    if("time".equals(result.get(FAIL_MSG))) {
                        logger.debug("Token Expired");
                        return ResponseEntity.status(200).body(MessageResponse.of(200, FAIL_MSG, "time expired"));
                    } else if(FAIL_MSG.equals(result.get(FAIL_MSG))) {
                        logger.debug("Token Validate Fail");
                        return ResponseEntity.status(200).body(MessageResponse.of(200, FAIL_MSG, "token not validate"));
                    } else {
                        logger.debug("new Token Success");
                        // 성공하면 새로운 쿠키 설정
                        SetCookie.setRefreshTokenCookie(response, result.get("refreshToken"));
                        return ResponseEntity.status(200).body(LoginResponse.of(200, SUCCESS_MSG, result));
                    }
                }
            } else {
                return ResponseEntity.status(200).body(MessageResponse.of(200, FAIL_MSG, "token not found"));
            }
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            logger.error("UserNotFound");
            return ResponseEntity.status(500).body(MessageResponse.of(200, FAIL_MSG, "User Not Found"));
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Refresh Token ERROR");
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, FAIL_MSG));
        }
    }


}
