package com.ssafy.backend.model.exception;

public class SessionTokenNotValid extends RuntimeException {
    public SessionTokenNotValid(String message) {
        super(message);
    }
}
