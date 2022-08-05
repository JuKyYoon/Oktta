package com.ssafy.backend.model.response;

import com.ssafy.backend.model.dto.BoardDto;
import com.ssafy.backend.model.dto.CommentDto;

import java.util.List;

public class BoardResponse extends BaseResponseBody {
    BoardDto boardDto;
    List<BoardDto> boardList;
    List<CommentDto> commentList;
    int lastPage;

    public BoardDto getBoardDto() {
        return boardDto;
    }

    public void setBoardDto(BoardDto boardDto) {
        this.boardDto = boardDto;
    }

    public List<BoardDto> getBoardList() {
        return boardList;
    }

    public void setBoardList(List<BoardDto> boardList) {
        this.boardList = boardList;
    }

    public List<CommentDto> getCommentList() {
        return commentList;
    }

    public void setCommentList(List<CommentDto> commentList) {
        this.commentList = commentList;
    }

    public int getLastPage() {
        return lastPage;
    }

    public void setLastPage(int lastPage) {
        this.lastPage = lastPage;
    }

    public static BoardResponse of(Integer statusCode, String message, BoardDto boardDto, List<CommentDto> list, int lastPage){
        BoardResponse res = new BoardResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setBoardDto(boardDto);
        res.setCommentList(list);
        res.setLastPage(lastPage);
        return res;
    }

    public static BoardResponse of(Integer statusCode, String message, List<BoardDto> list, int lastPage){
        BoardResponse res = new BoardResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setBoardList(list);
        res.setLastPage(lastPage);
        return res;
    }
}
