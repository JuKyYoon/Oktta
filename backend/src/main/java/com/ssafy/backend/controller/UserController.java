package com.ssafy.backend.controller;


import com.ssafy.backend.model.dto.PasswordDto;
import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.DuplicatedTokenException;
import com.ssafy.backend.model.exception.ExpiredTokenException;
import com.ssafy.backend.model.repository.UserAuthTokenRepository;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.service.MailService;
import com.ssafy.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@RequestMapping("/users")
public class UserController {
    private Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserRepository userRepository;
    private final UserAuthTokenRepository userAuthTokenRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final MailService mailService;

    public UserController(UserRepository userRepository, UserAuthTokenRepository userAuthTokenRepository, ModelMapper modelMapper, UserService userService, MailService mailService){
        this.userRepository = userRepository;
        this.userAuthTokenRepository = userAuthTokenRepository;
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.mailService = mailService;
    }


    @GetMapping("")
    public ResponseEntity<? extends BaseResponseBody> test() {
        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername()).orElse(null);
        logger.debug(user.getId());
        logger.debug(user.getNickname());

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @PostMapping("/signup")
    public ResponseEntity<? extends BaseResponseBody> signup(@RequestBody UserDto user) {
        try {
            userService.registUser(user);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        }catch (DuplicatedTokenException e){
            e.printStackTrace();
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "token error"));
        }catch(SQLException e){
            e.printStackTrace();
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "fail"));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "fail2"));
        }
    }

    @PostMapping("/modifypw")
    public ResponseEntity<? extends BaseResponseBody> modifypw(@RequestBody PasswordDto passwords) {

        // access token에서 id 부분
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername()).orElse(null);
        if (user != null) {

        }
        String id = user.getId();
        logger.debug(id);

        try {
            if (userService.modifyPassword(id, passwords) != -1)
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
            else    // -1은 기존 비밀번호 틀렸을 경우
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "check your original password"));
        } catch (SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "fail"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "fail2"));
        }
    }

    @GetMapping("/signupConfirm/{authKey}")
    public ResponseEntity<? extends BaseResponseBody> signupConfirm(@PathVariable("authKey") String authKey) {
        logger.info("signupConfirm");
        try {
            userService.authUser(authKey);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        }catch (ExpiredTokenException e){
            e.printStackTrace();
            return ResponseEntity.status(200).body(BaseResponseBody.of(200,"expired key"));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(200).body(BaseResponseBody.of(500, "fail"));
        }
    }

    @GetMapping("/remail")
    public ResponseEntity<? extends BaseResponseBody> resendAuthMail() {
        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername()).orElse(null);
        try{
            userService.resendAuthMail(user.getId());
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(200).body(BaseResponseBody.of(500, "fail"));
        }
    }
}
