package com.ssafy.backend.model.exception;

public class InputDataNullException extends RuntimeException {
    public InputDataNullException(String message){
        super(message);
    }
}
