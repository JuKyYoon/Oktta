package com.ssafy.backend.model.exception;

public class DuplicatedTokenException extends RuntimeException{
    public DuplicatedTokenException() {
        super("중복 토큰입니다.");
    }
}
