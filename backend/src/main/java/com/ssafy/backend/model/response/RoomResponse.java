package com.ssafy.backend.model.response;

import com.ssafy.backend.model.dto.RoomCommentDto;
import com.ssafy.backend.model.dto.RoomDto;
import com.ssafy.backend.model.entity.RoomComment;

import java.util.List;

public class RoomResponse extends BaseResponseBody {
    RoomDto result;
    List<?> list;
    int lastPage;

    public RoomDto getResult() {
        return result;
    }

    public List<?> getList() { return list; }

    public int getLastPage() { return lastPage; }

    public void setResult(RoomDto result) {
        this.result = result;
    }

    public void setList(List<?> list) { this.list = list; }

    public void setLastPage(int lastPage) { this.lastPage = lastPage; }


    public static RoomResponse of(Integer statusCode, String message, RoomDto dto, List<RoomCommentDto> list, int lastPage) {
        RoomResponse res = new RoomResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setResult(dto);
        res.setList(list);
        res.setLastPage(lastPage);
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

    public static RoomResponse of(Integer statusCode, String message, List<?> list){
        RoomResponse res = new RoomResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setList(list);
        return res;
    }
}
