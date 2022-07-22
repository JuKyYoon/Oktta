package com.ssafy.backend.model.exception;

public class DuplicatedTokenException extends RuntimeException{
    public DuplicatedTokenException(String message) {
        super(message);
    }
}
