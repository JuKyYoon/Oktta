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
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Random;

@Service
public class MailServiceImpl implements MailService{
    private Logger logger = LoggerFactory.getLogger(MailServiceImpl.class);
    private final JavaMailSender javaMailSender;

    @Value("http://${server.address}:${server.port}${server.servlet.contextPath}")
    private String URL;
    private final InternetAddress SENDER = new InternetAddress("oktta@gmail.com", "옥따", "utf-8");
    public MailServiceImpl(JavaMailSender javaMailSender) throws UnsupportedEncodingException {
        this.javaMailSender = javaMailSender;
    }
    @Override
    @Async("mailExecutor")
    public void sendAuthMail(String email, String authKey) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        String mailContent = "<h1>[옥따 이메일 인증]</h1><br><p>아래 링크를 클릭하여 계정을 등록해주세요.</p>"
                + "<a href='" + URL + "/users/signupConfirm/" + authKey + "' target='_blank'>이메일 인증하기</a>";
        message.setSubject("옥따 회원인증 메일입니다.","utf-8");
        sendMail(email, message, mailContent);
    }
    @Override
    @Async("mailExecutor")
    public void sendMail(String email, MimeMessage message, String mailContent) {
        try{
            message.setFrom(SENDER);
            message.addRecipient(MimeMessage.RecipientType.TO, new InternetAddress(email));
            message.setText(mailContent,"utf-8","html");
            javaMailSender.send(message);
            logger.info("send mail complete");
        } catch (AddressException e) {
            e.printStackTrace();
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
