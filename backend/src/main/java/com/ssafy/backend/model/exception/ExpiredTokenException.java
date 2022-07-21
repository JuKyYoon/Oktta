package com.ssafy.backend.model.exception;

public class ExpiredTokenException extends RuntimeException {
    public ExpiredTokenException() {
        super("만료된 인증키입니다.");
    }
}
