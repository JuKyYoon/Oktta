package com.ssafy.backend.model.response;

public class MessageResponse extends BaseResponseBody {
    String result;

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public static MessageResponse of(Integer statusCode, String message, String result) {
        MessageResponse res = new MessageResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setResult(result);
        return res;
    }
}
