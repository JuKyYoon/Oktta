package com.ssafy.backend.controller;

import com.ssafy.backend.model.BaseResponseBody;
import com.ssafy.backend.model.dto.PasswordDto;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private final UserService userService;
    private final ModelMapper modelMapper;

    public UserController(UserRepository userRepository, UserService userService, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }


    @GetMapping("")
    public ResponseEntity<? extends BaseResponseBody> test() {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername());
        logger.debug(user.getId());
        logger.debug(user.getNickname());

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @PostMapping("/signup")
    public ResponseEntity<? extends BaseResponseBody> signup(@RequestBody UserDto user) {
        try {
            userService.registUser(user);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        } catch (SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "fail"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "fail2"));
        }
    }

    @PostMapping("/modifypw")
    public ResponseEntity<? extends BaseResponseBody> modifypw(@RequestBody PasswordDto passwords) {

        // access token에서 id 부분
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername());
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
}
