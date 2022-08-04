package com.ssafy.backend.model.response;

import com.ssafy.backend.model.dto.RoomDto;

public class RoomResponse extends BaseResponseBody {
    RoomDto result;

    public RoomDto getResult() {
        return result;
    }

    public void setResult(RoomDto result) {
        this.result = result;
    }

    public static RoomResponse of(Integer statusCode, String message, RoomDto dto) {
        RoomResponse res = new RoomResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setResult(dto);
        return res;
    }
}
