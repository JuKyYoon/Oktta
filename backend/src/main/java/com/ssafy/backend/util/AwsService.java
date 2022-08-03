package com.ssafy.backend.util;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;

@Service
public class AwsService {

    private String bucket = "oktta";
    private final AmazonS3Client amazonS3Client;

    public AwsService(AmazonS3Client amazonS3Client) {
        this.amazonS3Client = amazonS3Client;
    }

    /**
     * 프로필 이미지라면 separator가 id
     * 게시글에 등록되는 이미지 혹은 비디오의 경우 게시글의 idx
     *
     * s3에 올라간 주소값 return
     */
    public String fileUpload(String separator, MultipartFile multipartFile) {
        String originalName = separator + "-" + multipartFile.getOriginalFilename();
        long fileSize = multipartFile.getSize();

        ObjectMetadata objectMetadata = new ObjectMetadata();
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
}