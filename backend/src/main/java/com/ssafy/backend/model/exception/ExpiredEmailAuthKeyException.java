package com.ssafy.backend.model.exception;

public class ExpiredEmailAuthKeyException extends RuntimeException {
    public ExpiredEmailAuthKeyException(String message) {
        super(message);
    }
}
