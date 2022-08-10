package com.ssafy.backend.model.response;

public class SessionEnterResponse extends BaseResponseBody {
    String token;
    String title;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public static SessionEnterResponse of(Integer statusCode, String message, String token, String title) {
        SessionEnterResponse res = new SessionEnterResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setToken(token);
        res.setTitle(title);
        return res;
    }

}
