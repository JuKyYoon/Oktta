package com.ssafy.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
public class MailServiceImpl implements MailService{
    private static final Logger LOGGER = LoggerFactory.getLogger(MailServiceImpl.class);

    private static final String charset = "utf-8";

    private final JavaMailSender javaMailSender;

    @Value("${client.url}")
    private String clientUrl;

    private final InternetAddress sender = new InternetAddress("oktta@gmail.com", "옥따", charset);

    public MailServiceImpl(JavaMailSender javaMailSender) throws UnsupportedEncodingException {
        this.javaMailSender = javaMailSender;
    }

    /**
     * 이메일 전송
     * @param email 유저 이메일(= 아이디)
     * @param authKey 유저 인증키
     */
    @Override
    @Async("mailExecutor")
    public void sendAuthMail(String email, String authKey) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        String mailContent = "<h1>[옥따 이메일 인증]</h1><br><p>아래 링크를 클릭하여 계정을 등록해주세요.</p>"
                + "<a href='" + clientUrl + "/" + authKey + "' target='_blank'>이메일 인증하기</a>";

        message.setSubject("옥따 회원인증 메일입니다.",charset);
        sendMail(email, message, mailContent);
    }

    @Override
    @Async("mailExecutor")
    public void sendPasswordResetMail(String email, String resetToken) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        String mailContent = "<h1>[옥따 비밀번호 찾기]</h1><br><p>아래 링크를 클릭하여 비밀번호 초기화.</p>"
                + "<a href='" + clientUrl + "/password/" + resetToken + "' target='_blank'>비밀번호 설정하기</a>";
    
        message.setSubject("옥따 비밀번호 찾기 메일입니다.",charset);
        sendMail(email, message, mailContent);
    }

    /**
     * 이메일 전송
     * @param email
     * @param message
     * @param mailContent
     * @throws MessagingException
     */
    public void sendMail(String email, MimeMessage message, String mailContent) throws MessagingException {
        message.setFrom(sender);
        message.addRecipient(MimeMessage.RecipientType.TO, new InternetAddress(email));
        message.setText(mailContent,charset,"html");
        javaMailSender.send(message);
        LOGGER.info("send mail complete");
    }
}
