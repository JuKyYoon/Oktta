package com.ssafy.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Random;

@Service
public class MailServiceImpl implements MailService{
    private Logger logger = LoggerFactory.getLogger(MailServiceImpl.class);
    private final JavaMailSender javaMailSender;
    private final MimeMessage message;

    @Value("${server.servlet.contextPath}")
    private String CONTEXT_PATH;
    private final InternetAddress SENDER = new InternetAddress("oktta@gmail.com", "옥따", "utf-8");
    public MailServiceImpl(JavaMailSender javaMailSender) throws UnsupportedEncodingException {
        this.javaMailSender = javaMailSender;
        this.message = javaMailSender.createMimeMessage();
    }

    //인증키 생성

    @Override
    @Async("mailExecutor")
    public void sendAuthMail(String email, String authKey) throws Exception {
        String mailContent = "<h1>[옥따 이메일 인증]</h1><br><p>아래 링크를 클릭하시면 이메일 인증이 완료됩니다.</p>"
                + "<a href='http://localhost:8080" + CONTEXT_PATH + "/users/signupConfirm?authKey=" + authKey + "' target='_blank'>이메일 인증 확인</a>";
        message.setSubject("옥따 회원인증 메일입니다.","utf-8");
        message.setText(mailContent,"utf-8","html");
        message.setFrom(SENDER);
        message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
        try{
            javaMailSender.send(message);
            logger.info("send mail completed");
        }catch(MailException e){
            e.printStackTrace();
        }

    }
}
