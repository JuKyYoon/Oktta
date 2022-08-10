package com.ssafy.backend.controller;

import com.ssafy.backend.util.AwsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * 추후 삭제 예정
 */

@RestController
@RequestMapping("/aws")
public class TestController {

    private final AwsService awsService;

    public TestController(AwsService awsService) {
        this.awsService = awsService;
    }

    @PostMapping("")
    public String form(@RequestParam("testFile") MultipartFile file) {
        String id = "test@test.com";
        return awsService.fileUpload(file);
    }
}
