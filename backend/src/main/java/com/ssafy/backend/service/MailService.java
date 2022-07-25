package com.ssafy.backend.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public interface MailService {
    void sendAuthMail(String email, String authKey) throws MessagingException;
    void sendMail(String email, MimeMessage message, String mailContent) throws MessagingException;
}
