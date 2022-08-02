package com.ssafy.backend.controller;

import com.ssafy.backend.util.AwsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/aws")
public class TestController {

    private final AwsService awsService;

    public TestController(AwsService awsService) {
        this.awsService = awsService;
    }

    @PostMapping("")
    public String form(@RequestParam("fileTest") MultipartFile file) {
        awsService.uploadFile(file);
        return "success";
    }
}
