package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.PasswordDto;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.entity.UserAuthToken;
import com.ssafy.backend.model.entity.UserRole;
import com.ssafy.backend.model.exception.DuplicatedTokenException;
import com.ssafy.backend.model.exception.ExpiredEmailAuthKeyException;
import com.ssafy.backend.model.exception.PasswordNotMatchException;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.mapper.UserMapper;
import com.ssafy.backend.model.repository.UserAuthTokenRepository;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.util.RedisService;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
public class UserServiceImpl implements UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;

    private final UserAuthTokenRepository userAuthTokenRepository;

    private final MailService mailService;

    private final RedisService redisService;

    @Value("${email.expire-day}")
    private int expireDay;

    @Value("${email.auth-key-size}")
    private int authKeySize;

    @Value("${password.reset.expire-time}")
    private int resetTokenExpireTime;

    public UserServiceImpl(UserRepository userRepository, UserAuthTokenRepository userAuthTokenRepository, MailService mailService, RedisService redisService) {
        this.userRepository = userRepository;
        this.userAuthTokenRepository = userAuthTokenRepository;
        this.mailService = mailService;
        this.redisService = redisService;
    }

    /**
     * 회원가입
     * @param user { id, password, nickName }
     */
    @Override
    public void registUser(UserDto user) throws MessagingException {
        String encrypt = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()); // 10라운드
        userRepository.save(new User.Builder(user.getId(), user.getNickname(), encrypt).build());
        String authKey = "";
        UserAuthToken tokenResult;
        // 중복 인증 키 아닐 때 까지 반복
        do {
            authKey = RandomStringUtils.randomAlphanumeric(authKeySize);
            tokenResult = userAuthTokenRepository.findByToken(authKey).orElse(null);
        } while (tokenResult != null);

        try {
            userAuthTokenRepository.save(new UserAuthToken.Builder(user.getId(), authKey, LocalDateTime.now(),
                    LocalDateTime.now().plusDays(expireDay)).build());
        } catch (DataIntegrityViolationException e){
            throw new DataIntegrityViolationException("회원가입 시 중복된 키값");
        }

        // 인증 메일 전송
        LOGGER.info("send mail start");
        mailService.sendAuthMail(user.getId(), authKey);
    }

    @Override
    public void modifyUser(User user, UserDto changeUser) {
        // 비밀번호 체크
        boolean isValidate = BCrypt.checkpw(changeUser.getPassword(), user.getPassword());
        if(isValidate) {
            user.updateInfo(changeUser.getNickname());
            userRepository.save(user);
        } else {
            throw new PasswordNotMatchException("Password is Not Match");
        }
    }

    /**
     * 유저 아이디 중복 체크
     * @param userId 유저 아이디
     */
    @Override
    public boolean checkDuplicatedID(String userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user != null;
    }

    /**
     * 유저 닉네임 중복 체크
     * @param nickName 닉네임
     */
    @Override
    public boolean checkDuplicatedNickName(String nickName) {
        User user = userRepository.findByNickname(nickName).orElse(null);
        return user != null;
    }

    /**
     * 회원 탈퇴
     * @param user 로그인한 유저
     * @param reqPassword 확인 비밀번호
     */
    @Override
    public void deleteUser(User user, String reqPassword) {
        boolean isValidate = BCrypt.checkpw(reqPassword, user.getPassword());
        if(isValidate) {
            userRepository.delete(user);
        } else {
            throw new PasswordNotMatchException("Password is Not Match");
        }
    }

    /**
     * 비밀번호 찾기 위한 토큰을 발행하고, 이메일로 토큰 포함된 링크를 보낸다.
     * @param id 유저가 입력한 이메일
     * @return
     */
    @Override
    public void findPassword(String id) throws MessagingException {
        LOGGER.info("Find Password By Sending a Email");
        // 존재하는 유저인지 검사한다,
        userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User Not Found By Id")
        );
        String tokenResult = "";
        String resetToken = "";
        // 비밀번호 초기화 토큰을 발행한다. (Redis에 저장한다.)
        do {
            resetToken = RandomStringUtils.randomAlphanumeric(authKeySize);
            tokenResult = redisService.getStringValue(resetToken);
        } while(tokenResult != null);

        // 만료 시간 정하기
        Date now = new Date();
        Date expireTime = new Date(now.getTime() + resetTokenExpireTime);
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SSS Z")
                .withZone(ZoneId.systemDefault());

        String expireDate = format.format(expireTime.toInstant());
        String value = id + "=" + expireDate;
        redisService.setStringValueAndExpire(resetToken, value, resetTokenExpireTime);
        mailService.sendPasswordResetMail(id, resetToken);
    }

    /**
     * 회원가입 한 유저 인증
     * @param authKey 인증토큰
     */
    @Override
    public void authUser(String authKey) {
        // JPA 이용하는 거 줄여보기
        UserAuthToken userAuthToken = userAuthTokenRepository.findByToken(authKey).orElseThrow(
                () -> new UserNotFoundException("User Auth Token Not Found")
        );

        if(LocalDateTime.now().isAfter(userAuthToken.getExpireDate())){
            throw new ExpiredEmailAuthKeyException("만료된 인증 키입니다.");
        }
        User user = userRepository.findById(userAuthToken.getUserId()).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );
        user.updateUserRole(UserRole.ROLE_USER);
        userRepository.save(user);
        userAuthTokenRepository.delete(userAuthToken);
    }

    /**
     * 로그인 한 사용자가, 이메일 재전송
     * @param userId 유저아이디
     */
    @Override
    public void resendAuthMail(String userId) throws MessagingException {
        String authKey = "";
        UserAuthToken tokenResult;
        // 중복 인증 키 아닐 때 까지 반복
        do {
            authKey = RandomStringUtils.randomAlphanumeric(authKeySize);
            tokenResult = userAuthTokenRepository.findByToken(authKey).orElse(null);
        } while (tokenResult != null);

        try {
            userAuthTokenRepository.save(new UserAuthToken.Builder(userId, authKey, LocalDateTime.now(),
                    LocalDateTime.now().plusDays(expireDay)).build());
        } catch (IllegalArgumentException e){
            throw new DuplicatedTokenException("중복 토큰 발생!");
        }

        // 인증 메일 전송
        LOGGER.info("send mail start");
        mailService.sendAuthMail(userId, authKey);
    }

    /**
     * 비밀번호 수정
     * @param id 유저아이디
     * @param passwords 비밀번호 Dto
     */
    public int modifyPassword(String id, PasswordDto passwords)  {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );
        String oldPassword = passwords.getOldPassword();
        String newPassword = passwords.getNewPassword();

        // 기존 비밀번호가 맞지 않을 경우 false
        if(!BCrypt.checkpw(oldPassword, user.getPassword()))
            return -1;
        else {
            // 새로운 비밀번호로 저장
            String encrypt = BCrypt.hashpw(newPassword, BCrypt.gensalt());
            return userRepository.updatePassword(encrypt, user.getId());
        }
    }

    /**
     * User entity의 내용을 UserDto로 매핑 후, 비밀번호 제외
     * @param user
     * @param user
     */
    @Override
    public UserDto setUserInfo(User user) {
        return UserMapper.mapper.toDto(user);
    }

    /**
     * 토큰 유효성 판단 후, 만료시간 리턴
     */
    @Override
    public String validateResetToken(String resetToken) {
        LOGGER.info("Validate a Reset Token");
        String result = redisService.getStringValue(resetToken);
        if (result==null) {
            return null;
        }

        String[] splitStr = result.split("=");
        if (splitStr.length != 2) {
            return null;
        }
        return splitStr[1];
    }

    /**
     * 비밀번호 재설정
     * @param password
     * @param token
     * @return
     */
    @Override
    public boolean resetPassword(String password, String token) {
        LOGGER.info("Reset Password");
        // 시간 지나면 사라지기 때문에 만료시간 검사 필요 없다.
        String result = redisService.getStringValue(token);
        if (result == null || password == null) {
            return false;
        }
        // Redis에서 제거
        redisService.deleteKey(token);

        String[] splitStr = result.split("=");
        if (splitStr.length != 2) {
            return false;
        }

        String userId = splitStr[0];
        String encrypt = BCrypt.hashpw(password, BCrypt.gensalt());
        return userRepository.updatePassword(encrypt, userId) == 1;
    }
}
