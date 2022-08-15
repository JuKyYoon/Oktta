package com.ssafy.backend.util;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.backend.model.exception.FileTypeException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class AwsService {

    private String bucket = "oktta";
    private final AmazonS3Client amazonS3Client;

    public AwsService(AmazonS3Client amazonS3Client) {
        this.amazonS3Client = amazonS3Client;
    }

    /**
     * s3에 올라간 주소값 return
     */
    public String imageUpload(MultipartFile multipartFile) {
        String originalName = System.currentTimeMillis() + "_" + multipartFile.getOriginalFilename();
        long fileSize = multipartFile.getSize();

        ObjectMetadata objectMetadata = new ObjectMetadata();
        String contentType = multipartFile.getContentType().split("/")[0].toLowerCase();
        if(!contentType.equals("image")){
            throw new FileTypeException("FILE CONTENT TYPE IS NOT IMAGE");
        }
        objectMetadata.setContentType(multipartFile.getContentType());
        objectMetadata.setContentLength(fileSize);

        try(InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, originalName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch(IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드 실패");
        }

        return amazonS3Client.getResourceUrl(bucket, originalName);
    }

    public void fileDelete(String oldFileName) {
        amazonS3Client.deleteObject(bucket, oldFileName);
    }
}
