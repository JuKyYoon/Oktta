package com.ssafy.backend.controller;

import com.ssafy.backend.model.BaseResponseBody;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    private Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("")
    public ResponseEntity<? extends BaseResponseBody> test() {
        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername());
        logger.debug(user.getId());
        logger.debug(user.getNickname());

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }
}
