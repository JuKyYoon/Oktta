package com.ssafy.backend.model.response;

import java.util.Map;

public class LoginResponse extends BaseResponseBody {
    Map<String, String> result;

    public Map<String, String> getResult() {
        return result;
    }

    public void setResult(Map<String, String> result) {
        this.result = result;
    }

    public static LoginResponse of(Integer statusCode, String message, Map<String, String> token) {
        LoginResponse res = new LoginResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setResult(token);
        return res;
    }
}
