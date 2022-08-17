package com.ssafy.backend.controller;

import com.ssafy.backend.model.dto.PasswordDto;
import com.ssafy.backend.model.entity.LolAuth;
import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.response.LoginResponse;
import com.ssafy.backend.model.response.MessageResponse;
import com.ssafy.backend.model.response.UserInfoResponse;
import com.ssafy.backend.service.LOLService;
import com.ssafy.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;

    private final UserService userService;

    private final LOLService lolService;
    public UserController(UserService userService, LOLService lolService){
        this.userService = userService;
        this.lolService = lolService;
    }

    /**
     * 회원가입
     * @param user { id, nickName, password }
     */
    @PostMapping("")
    public ResponseEntity<BaseResponseBody> signup(@RequestPart("user") UserDto user, @RequestPart(name = "profileImg", required = false) MultipartFile profileImage) throws MessagingException {
        boolean result = userService.registUser(user, profileImage);
        if(result){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
        }else{
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, failMsg));
        }
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
        int result = userService.modifyPassword(principal.getUsername(), passwords);
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
        userService.resendAuthMail(principal.getUsername());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    /**
     * 아이디 중복 체크 API
     * @param userId 회원 아이디
     */
    @GetMapping("/id/{id}")
    public ResponseEntity<BaseResponseBody> checkDuplicateId(@PathVariable("id") String userId) {
        boolean isDuplicatedId = userService.checkDuplicatedID(userId);
        if(isDuplicatedId){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, failMsg));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
        }
    }

    /**
     * 닉네임 중복 체크 API
     */
    @GetMapping("/name/{nickname}")
    public ResponseEntity<BaseResponseBody> checkDuplicateNickName(@PathVariable("nickname") String nickName) {
        boolean isDuplicatedNickName = userService.checkDuplicatedNickName(nickName);
        if(isDuplicatedNickName){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, failMsg));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
        }
    }

    /**
     * 회원 탈퇴 API
     */
    @DeleteMapping("")
    public ResponseEntity<BaseResponseBody> deleteUser(@RequestBody Map<String, String> password){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userService.deleteUser(principal.getUsername(), password.get("password").trim());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    /**
     * 회원 수정 API
     */
    @PutMapping("")
    public ResponseEntity<BaseResponseBody> modifyUser(@RequestBody UserDto userDto){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userService.modifyUser(principal.getUsername(), userDto);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    /**
     * 로그인 한 유저 정보 불러오기
     */
    @GetMapping("/info")
    public ResponseEntity<UserInfoResponse> getMyInfo(){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDto userDto = userService.setUserInfo(principal.getUsername());
        LolAuth lolAuth = lolService.getUserLolAuth(principal.getUsername());
        if(lolAuth != null){
            userDto.setTier(lolAuth.getTier());
            userDto.setSummonerName(lolAuth.getSummonerName());
        }
        return ResponseEntity.status(200).body(UserInfoResponse.of(200, successMsg, userDto));
    }

    /**
     * 비밀번호 찾기 링크 전송
     */
    @GetMapping("/password/{id}")
    public ResponseEntity<BaseResponseBody> findPassword(@PathVariable("id")String id) throws MessagingException {
        userService.findPassword(id);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    /**
     * 비밀번호 찾기 토큰 검증
     */
    @GetMapping("/reset-token/{token}")
    public ResponseEntity<MessageResponse> validateResetToken(@PathVariable("token") String resetToken) {
        String result = userService.validateResetToken(resetToken);
        if(result != null) {
            return ResponseEntity.status(200).body(MessageResponse.of(200, successMsg, result));
        } else {
            return ResponseEntity.status(200).body(MessageResponse.of(200, failMsg, failMsg));
        }
    }

    /**
     * 비밀번호 재설정
     */
    @DeleteMapping("/reset-token/{token}")
    public ResponseEntity<BaseResponseBody> resetPassword(@PathVariable("token") String token,@RequestBody Map<String, String> password) {
        boolean result = userService.resetPassword(password.get("password"), token);
        if(result) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
        } else {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, failMsg));
        }
    }

    /**
     * 프로필 이미지 등록
     */
    @PostMapping("/profile-img")
    public ResponseEntity<BaseResponseBody> registProfileImage(@RequestParam("profileImg") MultipartFile file){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userService.registProfileImage(principal.getUsername(), file);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    /**
     * 프로필 이미지 삭제
     */
    @DeleteMapping("/profile-img")
    public ResponseEntity<BaseResponseBody> deleteProfileImage(){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userService.deleteProfileImage(principal.getUsername());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    /**
     * 내 티어 정보 가져오기
     */
    @GetMapping("/tier")
    public ResponseEntity<LoginResponse> getMyTier() {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Map<String, String> result = userService.getMyTier(principal.getUsername());
        return ResponseEntity.status(200).body(LoginResponse.of(200, successMsg, result));
    }
}
