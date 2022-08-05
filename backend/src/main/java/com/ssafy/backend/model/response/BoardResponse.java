package com.ssafy.backend.model.response;

import com.ssafy.backend.model.dto.BoardDto;

import java.util.List;

public class BoardResponse extends BaseResponseBody {
    BoardDto boardDto;
    List<BoardDto> list;
    int lastPage;

    public BoardDto getBoard() { return boardDto; }
    public List<BoardDto> getList() { return list; }
    public int getLastPage() { return lastPage; }
    public void setBoard(BoardDto boardDto) {
        this.boardDto = boardDto;
    }

    public void setList(List<BoardDto> list){
        this.list = list;
    }

    public void setLastPage(int lastPage) { this.lastPage = lastPage; }
    public static BoardResponse of(Integer statusCode, String message, BoardDto boardDto){
        BoardResponse res = new BoardResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setBoard(boardDto);
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
