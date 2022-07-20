package com.ssafy.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService{

    private final JavaMailSender javaMailSender;

    public MailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void sendMail(String email) {
        SimpleMailMessage simpleMessage = new SimpleMailMessage();
        simpleMessage.setTo(email);
        simpleMessage.setSubject("옥따 회원인증 메일입니다.");
        simpleMessage.setText("인증링크 들어갈 곳");
        javaMailSender.send(simpleMessage);
    }
}
