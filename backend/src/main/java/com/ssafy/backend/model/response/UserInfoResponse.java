package com.ssafy.backend.model.response;

import com.ssafy.backend.model.dto.UserDto;
public class UserInfoResponse extends BaseResponseBody {
    UserDto result;

    public UserDto getResult() {
        return result;
    }

    public void setResult(UserDto result) {
        this.result = result;
    }

    public static UserInfoResponse of(Integer statusCode, String message, UserDto user) {
        UserInfoResponse res = new UserInfoResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setResult(user);
        return res;
    }
}
