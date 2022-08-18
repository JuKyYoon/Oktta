package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.PasswordDto;
import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.LolAuth;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.entity.UserAuthToken;
import com.ssafy.backend.model.entity.UserRole;
import com.ssafy.backend.model.exception.*;
import com.ssafy.backend.model.mapper.UserMapper;
import com.ssafy.backend.model.repository.LolAuthRepository;
import com.ssafy.backend.model.repository.UserAuthTokenRepository;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.util.AwsService;
import com.ssafy.backend.util.RedisService;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;

    private final UserAuthTokenRepository userAuthTokenRepository;

    private final LolAuthRepository lolAuthRepository;

    private final MailService mailService;

    private final RedisService redisService;

    private final AwsService awsService;

    @Value("${email.expire-day}")
    private int expireDay;

    @Value("${email.auth-key-size}")
    private int authKeySize;

    @Value("${password.reset.expire-time}")
    private int resetTokenExpireTime;

    @Value("${default-profile-image-url}")
    private String defaultProfileImageUrl;

    private final int USER_ID_MIN_LENGTH = 5;
    private final int USER_ID_MAX_LENGTH = 40;
    private final int PASSWORD_MIN_LENGTH = 8;
    private final int PASSWORD_MAX_LENGTH = 16;

    public UserServiceImpl(UserRepository userRepository, UserAuthTokenRepository userAuthTokenRepository, MailService mailService, RedisService redisService, AwsService awsService, LolAuthRepository lolAuthRepository) {
        this.userRepository = userRepository;
        this.userAuthTokenRepository = userAuthTokenRepository;
        this.lolAuthRepository = lolAuthRepository;
        this.mailService = mailService;
        this.redisService = redisService;
        this.awsService = awsService;
    }

    /**
     * 회원가입
     * @param user { id, password, nickName }
     */
    @Override
    public boolean registUser(UserDto user, MultipartFile profileImage) throws MessagingException {
        // 유효성 검사
        if((user.getId().length() < USER_ID_MIN_LENGTH
                || user.getId().length() > USER_ID_MAX_LENGTH
                || user.getPassword().length() < PASSWORD_MIN_LENGTH
                || user.getPassword().length() > PASSWORD_MAX_LENGTH
                || user.getId().contains("=")
                || user.getNickname().contains("deleteuser")
        )){
            return false;
        }
        String encrypt = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()); // 10라운드
        // 유저 db 저장
        if(!profileImage.isEmpty()){
            userRepository.save(new User.Builder(user.getId(), user.getNickname(), encrypt, awsService.imageUpload(profileImage)).build());
        }else{
            userRepository.save(new User.Builder(user.getId(), user.getNickname(), encrypt).build());
        }
        // 이메일 인증키 생성
        String authKey = "";
        UserAuthToken tokenResult;
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
        return true;
    }

    @Override
    public boolean modifyUser(String userId, UserDto changeUser) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        // 닉네임 deleteUser 포함여부 검사
        if(changeUser.getNickname().contains("deleteUser")){
            return false;
        }
        // 소셜 로그인 유저
        if(user.getSnsType() != 0){
            user.updateInfo(changeUser.getNickname());
            userRepository.save(user);
            return true;
        }
        // 비밀번호 체크
        boolean isValidate = BCrypt.checkpw(changeUser.getPassword(), user.getPassword());
        if(isValidate) {
            user.updateInfo(changeUser.getNickname());
            userRepository.save(user);
        } else {
            throw new PasswordNotMatchException("Password is Not Match");
        }
        return true;
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
     * user 로그인한 유저
     * @param reqPassword 확인 비밀번호
     */
    @Override
    public void deleteUser(String userId, String reqPassword) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        String password = user.getPassword();
        int snsType = user.getSnsType();
        LolAuth lolAuth = lolAuthRepository.findByUserId(user.getId()).orElse(null);
        if(lolAuth != null){
            lolAuthRepository.deleteById(lolAuth.getUserId());
        }
        user.deleteUser();
        if(snsType != 0){
            userRepository.save(user);
            return;
        }
        boolean isValidate = BCrypt.checkpw(reqPassword, password);
        if(isValidate) {
            userRepository.save(user);
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
        User user = userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User Not Found By Id")
        );

        // 소셜 로그인 유저인지 검사.
        if(user.getSnsType() != 0){
            throw new SocialUserException("Social User Can't Find Password!");
        }

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
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        if(user.getSnsType() != 0){
            throw new SocialUserException("Social User Can't Send ReAuth Mail");
        }

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

        if(user.getSnsType() != 0){
            throw new SocialUserException("Social User Can't Modify Password");
        }

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
     * 소셜 로그인 유저의 경우 아이디, 비밀번호 제외하여 UserDto 반환
     */
    @Override
    public UserDto setUserInfo(String userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        if(user.getSnsType() != 0){
            return new UserDto(user.getNickname(), user.getCreateDate().toString(),
                    user.getModifyDate().toString(), user.getProfileImg(),
                    user.getSnsType(), user.getRole().toString());
        }
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


    /**
     * 프로필 이미지 등록 및 수정
     * @param userId
     * @param file
     */
    @Override
    public void registProfileImage(String userId, MultipartFile file) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("USER NOT FOUND"));
        String path = awsService.imageUpload(file);
//        deleteOldFile(user);
        userRepository.updateProfileImage(user.getIdx(), path);
    }

    /**
     * 프로필 이미지 삭제
     * @param userId
     */
    @Override
    public void deleteProfileImage(String userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("USER NOT FOUND"));
//        deleteOldFile(user);
        userRepository.updateProfileImage(user.getIdx(), defaultProfileImageUrl);
    }

    /**
     * 예전 프로필 이미지 S3 서버에서 삭제
     * @param user
     */
    @Async("awsExecutor")
    void deleteOldFile(User user){
        String oldPath = user.getProfileImg();
        if(!oldPath.equals(defaultProfileImageUrl)){
            String oldFileName = oldPath.substring(oldPath.lastIndexOf('/') + 1);
            awsService.fileDelete(oldFileName);
        }
    }

    @Override
    public Map<String, String> getMyTier(String userId) {
        Map<String, String> result = new HashMap<>();
        result.put("tier", "");
        result.put("summonerName", "");
        LolAuth lolAuth = lolAuthRepository.findByUserId(userId).orElse(null);
        if(lolAuth != null){
            result.put("tier", String.valueOf(lolAuth.getTier()));
            result.put("summonerName", lolAuth.getSummonerName());
        }
        return result;
    }

}
