package com.ssafy.backend.controller;

import com.ssafy.backend.model.dto.PasswordDto;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;

@RestController
@RequestMapping("/user")
public class UserController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;

    private final UserRepository userRepository;

    private final UserService userService;

    public UserController(UserRepository userRepository, UserService userService){
        this.userRepository = userRepository;
        this.userService = userService;
    }

    /**
     * ROLE_USER
     * 테스트용 코드. 추후 삭제 예정
     * @return
     */
    @GetMapping("/test")
    public ResponseEntity<BaseResponseBody> test() {
        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername()).orElse(null);

        if(user != null) {
            LOGGER.debug(user.getRole().getValue());
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "null"));
        } else {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
        }
    }

    /**
     * 회원가입
     * @param user { id, nickName, password }
     */
    @PostMapping("")
    public ResponseEntity<BaseResponseBody> signup(@RequestBody UserDto user) throws MessagingException {
        userService.registUser(user);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    /**
     * ROLE_USER
     * 비밀번호 수정
     * @param passwords { oldPassword, newPassword }
     */
    @PatchMapping("/password")
    public ResponseEntity<BaseResponseBody> modifyPW(@RequestBody PasswordDto passwords) {
        // access token 에서 id 부분
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername()).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        int result = userService.modifyPassword(user.getId(), passwords);
        if(result == 1) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
        } else if (result == -1 ) {
            // -1은 기존 비밀번호 틀렸을 경우
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "wrong password"));
        } else {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, failMsg));
        }
    }

    /**
     * 인증키에 매핑된 회원 아이디 ROLE 을 USER 로 변경
     * @param authKey 회원 인증 키
     */
    @GetMapping("/auth/{authKey}")
    public ResponseEntity<BaseResponseBody> signupConfirm(@PathVariable("authKey") String authKey) {
        userService.authUser(authKey);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    /**
     * ROLE_USER
     * 인증 이메일 재전송 API
     */
    @GetMapping("/reauth")
    public ResponseEntity<BaseResponseBody> resendAuthMail() throws MessagingException {
        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername()).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        userService.resendAuthMail(user.getId());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    /**
     * 아이디 중복 체크 API
     * @param userId 회원 아이디
     */
    @GetMapping("/idcheck")
    public ResponseEntity<BaseResponseBody> checkDuplicateId(@RequestParam("userId") String userId) {
        boolean isDuplicatedId = userService.checkDuplicatedID(userId);
        if(isDuplicatedId){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, failMsg));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
        }
    }
}
