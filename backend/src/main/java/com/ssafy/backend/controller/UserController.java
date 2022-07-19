package com.ssafy.backend.controller;

import com.ssafy.backend.model.BaseResponseBody;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;
    public UserController(ModelMapper modelMapper, UserService userService){
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("")
    public ResponseEntity<? extends BaseResponseBody> test() {

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @PostMapping("/signup")
    public ResponseEntity<? extends  BaseResponseBody> signup(@RequestBody User user) {
        User newUser = userService.registUser(modelMapper.map(user, User.class));
        if(newUser == null){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "fail"));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));
        }
    }
}
