package com.ssafy.backend.model.response;

import com.ssafy.backend.model.dto.RoomDto;

import java.util.List;

public class RoomResponse extends BaseResponseBody {
    RoomDto result;
    List<RoomDto> list;
    int lastPage;

    public RoomDto getResult() {
        return result;
    }

    public List<RoomDto> getList() { return list; }

    public int getLastPage() { return lastPage; }

    public void setResult(RoomDto result) {
        this.result = result;
    }

    public void setList(List<RoomDto> list) { this.list = list; }

    public void setLastPage(int lastPage) { this.lastPage = lastPage; }

    public static RoomResponse of(Integer statusCode, String message, RoomDto dto) {
        RoomResponse res = new RoomResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setResult(dto);
        return res;
    }

    public static RoomResponse of(Integer statusCode, String message, List<RoomDto> list, int lastPage){
        RoomResponse res = new RoomResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setList(list);
        res.setLastPage(lastPage);
        return res;
    }

}
