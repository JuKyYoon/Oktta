package com.ssafy.backend.model.response;

import com.ssafy.backend.model.dto.BoardDto;
import com.ssafy.backend.model.dto.BoardCommentDto;

import java.util.List;

public class BoardResponse extends BaseResponseBody {
    BoardDto boardDto;
    List<?> list;
    int lastPage;

    public BoardDto getBoardDto() {
        return boardDto;
    }

    public void setBoardDto(BoardDto boardDto) {
        this.boardDto = boardDto;
    }

    public List<?> getList() {
        return list;
    }

    public void setList(List<?> list) {
        this.list = list;
    }

    public int getLastPage() {
        return lastPage;
    }

    public void setLastPage(int lastPage) {
        this.lastPage = lastPage;
    }

    public static BoardResponse of(Integer statusCode, String message, BoardDto boardDto, List<BoardCommentDto> list, int lastPage){
        BoardResponse res = new BoardResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setBoardDto(boardDto);
        res.setList(list);
        res.setLastPage(lastPage);
        return res;
    }

    public static BoardResponse of(Integer statusCode, String message, List<BoardDto> list, int lastPage){
        BoardResponse res = new BoardResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setList(list);
        res.setLastPage(lastPage);
        return res;
    }
}
