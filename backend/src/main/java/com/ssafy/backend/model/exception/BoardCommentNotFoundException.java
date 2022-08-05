package com.ssafy.backend.model.exception;

public class BoardCommentNotFoundException extends RuntimeException {
    public BoardCommentNotFoundException(String message) {
        super(message);
    }
}
