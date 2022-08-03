package com.ssafy.backend.model.exception;

public class SessionIsNotValid extends RuntimeException {
    public SessionIsNotValid(String message) {
        super(message);
    }
}
