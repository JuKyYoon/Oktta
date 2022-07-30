package com.ssafy.backend.model.response;

import com.ssafy.backend.model.dto.BoardDto;

import java.util.Map;

public class BoardResponse extends BaseResponseBody {
    BoardDto boardDto;

    public BoardDto getBoard() { return boardDto; }

    public void setBoard(BoardDto boardDto) {
        this.boardDto = boardDto;
    }

    public static BoardResponse of(Integer statusCode, String message, BoardDto boardDto){
        BoardResponse res = new BoardResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setBoard(boardDto);
        return res;
    }
}
