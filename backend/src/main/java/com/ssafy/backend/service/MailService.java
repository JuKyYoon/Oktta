package com.ssafy.backend.service;

import javax.mail.internet.MimeMessage;

public interface MailService {
    public void sendAuthMail(String email, String authKey) throws Exception;
    public void sendMail(String email, MimeMessage message, String mailContent) throws Exception;
}
