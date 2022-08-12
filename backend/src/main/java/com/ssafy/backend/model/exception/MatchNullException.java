package com.ssafy.backend.model.exception;

public class MatchNullException extends RuntimeException {
    public MatchNullException(String message){
        super(message);
    }
}
