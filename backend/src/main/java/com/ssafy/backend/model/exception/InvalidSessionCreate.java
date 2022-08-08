package com.ssafy.backend.model.exception;

public class InvalidSessionCreate extends RuntimeException{
    public InvalidSessionCreate(String message) {
        super(message);
    }
}
