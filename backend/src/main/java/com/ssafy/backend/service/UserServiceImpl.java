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
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;

    private final UserAuthTokenRepository userAuthTokenRepository;

    private final MailService mailService;

    @Value("${email.expire-day}")
    private int expireDay;

    @Value("${email.auth-key-size}")
    private int authKeySize;

    public UserServiceImpl(UserRepository userRepository, UserAuthTokenRepository userAuthTokenRepository, MailService mailService) {
        this.userRepository = userRepository;
        this.userAuthTokenRepository = userAuthTokenRepository;
        this.mailService = mailService;
    }

    /**
     * 회원가입
     * @param user { id, password, nickName }
     */
    @Override
    public void registUser(UserDto user) throws MessagingException {
        String encrypt = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()); // 10라운드
        userRepository.save(new User.Builder(user.getId(), user.getNickname(), encrypt).build());
        String authKey = RandomStringUtils.randomAlphanumeric(authKeySize);

        try {
            userAuthTokenRepository.save(new UserAuthToken.Builder(user.getId(), authKey, LocalDateTime.now(),
                    LocalDateTime.now().plusDays(expireDay)).build());
        } catch (IllegalArgumentException e){
            throw new DuplicatedTokenException("중복 토큰 발생!");
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

    @Override
    public User findUser(String id) {
        return null;
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

    @Override
    public User findPassword(User user) {
        return null;
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
        String authKey = RandomStringUtils.randomAlphanumeric(authKeySize);
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
}
