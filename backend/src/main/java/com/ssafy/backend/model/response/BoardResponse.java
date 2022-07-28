package com.ssafy.backend.model.response;

import com.ssafy.backend.model.entity.Board;

import java.util.Map;

public class BoardResponse extends BaseResponseBody {
    Board board;

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public static BoardResponse of(Integer statusCode, String message, Board board){
        BoardResponse res = new BoardResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setBoard(board);
        return res;
    }
}
