package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.entity.UserAuthToken;
import com.ssafy.backend.model.exception.ExpiredTokenException;
import com.ssafy.backend.model.repository.UserAuthTokenRepository;
import com.ssafy.backend.model.repository.UserRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {
    private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository userRepository;
    private final UserAuthTokenRepository userAuthTokenRepository;
    private final MailService mailService;

    @Value("${email.expire-day}")
    private int EXPIRE_DAY;
    @Value("${email.auth-key-size}")
    private int AUTH_KEY_SIZE;

    public UserServiceImpl(UserRepository userRepository, UserAuthTokenRepository userAuthTokenRepository, MailService mailService) {
        this.userRepository = userRepository;
        this.userAuthTokenRepository = userAuthTokenRepository;
        this.mailService = mailService;
    }


    @Override
    public User loginUser(User user) throws SQLException {
        return null;
    }

    @Override
    public boolean registUser(UserDto user) throws Exception {
        String encrypt = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()); // 10라운드
        logger.info("saveUser");
        userRepository.save(new User.Builder(user.getId(), user.getNickname(), encrypt).build());
        logger.info("getRandomKey");
        String authKey = RandomStringUtils.randomAlphanumeric(AUTH_KEY_SIZE);
        logger.info("saveAuthKey");
        userAuthTokenRepository.save(new UserAuthToken.Builder(user.getId(), authKey, LocalDateTime.now().plusDays(EXPIRE_DAY)).build());
        logger.info("send mail start");
        mailService.sendAuthMail(user.getId(), authKey);
        return true;
    }

    @Override
    public int modifyUser(User user) throws SQLException {
        return 0;
    }

    @Override
    public User findUser(String id) throws SQLException {
        return userRepository.findById(id);
    }

    @Override
    public int checkDuplicatedID(String id) throws SQLException {
        return 0;
    }

    @Override
    public int deleteUser(String id) throws SQLException {
        return 0;
    }

    @Override
    public User findPassword(User user) throws SQLException {
        return null;
    }

    @Override
    public void authUser(String authKey) throws Exception {
        UserAuthToken userAuthToken = userAuthTokenRepository.findByToken(authKey);
        if(LocalDateTime.now().isAfter(userAuthToken.getExpireDate())){
            throw new ExpiredTokenException();
        }
        User user = userRepository.findById(userAuthToken.getUserId());
        user.updateEmailAuth(true);
        userRepository.save(user);
        userAuthTokenRepository.delete(userAuthToken);
    }
}
