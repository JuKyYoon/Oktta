package com.ssafy.backend.controller;

import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.model.response.EditorResponse;
import com.ssafy.backend.util.AwsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/editor")
public class EditorController {

    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;

    private final AwsService awsService;

    public EditorController(AwsService awsService){
        this.awsService = awsService;
    }

    @PostMapping("/upload")
    public ResponseEntity<EditorResponse> imageUpload(@RequestParam("upload") MultipartFile file){
        String path = awsService.imageUpload(file);
        return ResponseEntity.status(200).body(EditorResponse.of(path));
    }
}
