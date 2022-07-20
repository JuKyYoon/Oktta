package com.ssafy.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
public class MailServiceImpl implements MailService{

    private final JavaMailSender javaMailSender;
    private final MimeMessage message;
    private int size;
    public MailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
        this.message = javaMailSender.createMimeMessage();
    }

    //인증키 생성
    private String getKey(int size) {
        this.size = size;
        return getAuthCode();
    }
    //인증코드 난수 발생
    private String getAuthCode() {
        Random random = new Random();
        StringBuffer buffer = new StringBuffer();
        int num = 0;

        while(buffer.length() < size) {
            num = random.nextInt(10);
            buffer.append(num);
        }

        return buffer.toString();
    }
    @Override
    public void sendAuthMail(String email) {
        String authKey = getKey(6);
        String mailContent = "<h1>[이메일 인증]</h1><br><p>아래 링크를 클릭하시면 이메일 인증이 완료됩니다.</p>"
                + "<a href='http://localhost:8080/signUpConfirm?email="
                + email + "&authKey=" + authKey + "' target='_blank'>이메일 인증 확인</a>";
        try {
            message.setSubject("옥따 회원인증 메일입니다.","utf-8");
            message.setText(mailContent,"utf-8","html");
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
            javaMailSender.send(message);
        }catch(MessagingException e){
            e.printStackTrace();
        }
    }
}
