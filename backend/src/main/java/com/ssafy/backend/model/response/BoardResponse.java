package com.ssafy.backend.model.response;

import com.ssafy.backend.model.dto.BoardDto;

import java.util.List;

public class BoardResponse extends BaseResponseBody {
    BoardDto boardDto;
    List<BoardDto> list;

    public BoardDto getBoard() { return boardDto; }
    public List<BoardDto> getList() { return list; }

    public void setBoard(BoardDto boardDto) {
        this.boardDto = boardDto;
    }

    public void setList(List<BoardDto> list){
        this.list = list;
    }

    public static BoardResponse of(Integer statusCode, String message, BoardDto boardDto){
        BoardResponse res = new BoardResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setBoard(boardDto);
        return res;
    }

    public static BoardResponse of(Integer statusCode, String message, List<BoardDto> list){
        BoardResponse res = new BoardResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setList(list);
        return res;
    }
}
