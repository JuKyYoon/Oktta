package com.ssafy.backend.service;

public interface MailService {
    public void sendAuthMail(String email, String authKey) throws Exception;
}
