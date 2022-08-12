package com.ssafy.backend.util;

import org.springframework.stereotype.Component;

@Component
public class DeleteUserService {

    private final String DELETE_USER = "deleteuser";
    private final String UNKNOWN_USER = "알수없음";

    public String checkNickName(String nickName){
        return nickName.contains(DELETE_USER) ? UNKNOWN_USER : nickName;
    }
}
