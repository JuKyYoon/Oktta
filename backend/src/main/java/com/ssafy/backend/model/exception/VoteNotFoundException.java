package com.ssafy.backend.model.exception;

public class VoteNotFoundException extends RuntimeException{
    public VoteNotFoundException(String message) {
        super(message);
    }
}
