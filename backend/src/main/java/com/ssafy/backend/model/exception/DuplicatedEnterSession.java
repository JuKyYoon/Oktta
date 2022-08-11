package com.ssafy.backend.model.exception;

public class DuplicatedEnterSession extends RuntimeException {
    public DuplicatedEnterSession(String message) {
        super(message);
    }
}
