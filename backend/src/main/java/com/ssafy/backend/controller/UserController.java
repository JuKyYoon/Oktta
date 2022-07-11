package com.ssafy.backend.controller;

import com.ssafy.backend.model.BaseResponseBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    @GetMapping("")
    public ResponseEntity<? extends BaseResponseBody> test() {

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }
}
