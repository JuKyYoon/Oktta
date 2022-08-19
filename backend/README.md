#  Backend

## 🔨기술 스택 
| Tech | Version | 
|--|--|
| Java | 1.8 |
|SpringBoot|2.7.1
| SpringSecurity | 2.7.1 |
| Gradle | 7.4.1 |
| Hibernate | 5.6.9 | 
| Docker | 22.06.0 | 
| AWS EC2 Ubuntu | 20.04 LTS | 
| AWS S3 |  | 



| Tech | DockerImage |
|--|--| 
| OpenVidu | 2.22.0 | 
| Kurento Media Server| 6.18.0 | 
| MySQL | 8.0.28 | 
| Redis | alpine | 
| Nginx | stable-alpine |
| Jenkins | LTS | 

## 🔧개발환경 구성

- IntelliJ IDEA 2022.1.3
- JDK 1.8
- Windows 10
- Junit 4.13.2
- Postman
- GitLab
- Jira


## 📁프로젝트 구조

```
└──/main
	├── java
	│	└── com
	│		└── ssafy
	│			└── backend
	│				├── config  /* 환경설정 파일 */
	│				│ 	├── properties
	│				|	│	└──	AppProperties.java
	│				|	├── AsyncConfig.java
	│				|	├── AwsConfig.java
	│				|	├── JwtSecurityConfig.java
	│				|	├──	RedisConfig.java
	│				|	├── SecurityConfig.java
	│				|	├── WebClientConfig.java
	│				|	└── WebConfig.java
	│				├── controller
	│				|	├── AuthController.java
	│				|	├── BoardCommentController.java
	│				|	├── BoardController.java
	│				|	├── EditorController.java
	│				|	├── LolController.java
	│				|	├── RoomCommentController.java
	│				|	├── RoomController.java
	│				|	├── SessionController.java
	│				|	├── UserController.java
	│				|	└── VoteController.java
	│				├── filter
	│				|	└── JwtAuthFilter.java
	│				├── handler
	│				|	└── security
	|				|			├── AuthenticationEntryPointHandler.java
	|				|			├── OAuth2AuthenticationFailureHandler.java
	|				|			├── OAuth2AuthenticationSuccessHandler.java
	|				|			├── TokenAccessDeniedHandler.java
	|				|			└── WebAccessDeniedHandler.java
	│				├── info /* 소셜 로그인 유저 정보 */
	│				│	├── impl
	│				│	│	├── GoogleOAuth2UserInfo.java
	│				│	│	├── KakaoOAuth2UserInfo.java
	│				│	│	└── NaverOAuth2UserInfo.java
	│				│	├── OAuth2UserInfo.java
	│				│	└── OAuth2UserInfoFactory.java
	│				├── model
	│				│	├── compositekey /* 복합키 */
	│				│	│	└── VoteRecordId.java
	│				│	├── dto
	│				│	│	├── lol /* 리그오브 레전드 관련 dto*/ 
	│				│	│	│	├── MatchDto.java
	│				│	│	│	└── ParticipantDto.java
	│				│	│	├── BoardCommentDto.java
	│				│	│	├── BoardDto.java
	│				│	│	├── LolInfoDto.java
	│				│	│	├── PasswordDto.java
	│				│	│	├── RoomCommentDto.java
	│				│	│	├── RoomDto.java
	│				│	│	├── SessionEventDto.java
	│				│	│	├── UserDto.java
	│				│	│	└── VoteDto.java
	│				│	├── entity
	│				│	│	├── Board.java
	│				│	│	├── BoardComment.java
	│				│	│	├── LolAuth.java
	│				│	│	├── Match.java
	│				│	│	├── ProviderType.java
	│				│	│	├── Room.java
	│				│	│	├── RoomComment.java
	│				│	│	├── User.java
	│				│	│	├── UserAuthToken.java
	│				│	│	├── UserPrincipal.java
	│				│	│	├── UserRole.java
	│				│	│	├── Video.java
	│				│	│	├── Vote.java
	│				│	│	└── VoteRecord.java
	│				│	├── exception /* 커스텀 예외 */
	│				│	│	├── BoardNotFoundException.java
	│				│	│	├── CommentNotFoundException.java
	│				│	│	├── DuplicatedEnterSession.java
	│				│	│	├── DuplicatedTokenException.java
	│				│	│	├── ExpiredEmailAuthKeyException.java
	│				│	│	├── FileTypeException.java
	│				│	│	├── InputDataNullException.java
	│				│	│	├── InvalidSessionCreate.java
	│				│	│	├── PasswordNotMatchException.java
	│				│	│	├── RoomNotFoundException.java
	│				│	│	├── SessionIsNotValid.java
	│				│	│	├── SessionNotFoundException.java
	│				│	│	├── SessionTokenNotValid.java
	│				│	│	├── SocialUserException.java
	│				│	│	├── TokenValidFailedException.java
	│				│	│	├── UserNotFoundException.java
	│				│	│	└── VoteNotFoundException.java
	│				│	├── mapper
	│				│	│	├── EntityMapper.java
	│				│	│	├── MatchMapper.java
	│				│	│	├── RoomMapper.java
	│				│	│	└── UserMapper.java
	│				│	├── repository
	│				│	│	├── BoardCommentRepository.java
	│				│	│	├── BoardRepository.java
	│				│	│	├── LolAuthRepository.java
	│				│	│	├── MatchRepository.java
	│				│	│	├── OAuth2AuthorizationRequestBasedOnCookieRepository.java
	│				│	│	├── RoomCommentRepository.java
	│				│	│	├── RoomRepository.java
	│				│	│	├── UserAuthTokenRepository.java
	│				│	│	├── UserRepository.java
	│				│	│	├── VideoRepository.java
	│				│	│	├── VoteRecordRepository.java
	│				│	│	└── VoteRepository.java
	│				│	└── response
	│				│		├── BaseResponseBody.java
	│				│		├── BoardResponse.java
	│				│		├── EditorResponse.java
	│				│		├── LoginResponse.java
	│				│		├── MatchResponse.java
	│				│		├── MessageResponse.java
	│				│		├── RecordingResponse.java
	│				│		├── RoomResponse.java
	│				│		├── SessionEnterResponse.java
	│				│		├── UserInfoResponse.java
	│				│		└── VideoResponse.java
	│				│		
	│				├── security
	│				│	├── JwtProvider.java
	│				│	└── MyUserDetailService.java
	│				├── service
	│				│	├── AuthService.java
	│				│	├── AuthServiceImpl.java
	│				│	├── BoardCommentService.java
	│				│	├── BoardCommentServiceImpl.java
	│				│	├── BoardService.java
	│				│	├── BoardServiceImpl.java
	│				│	├── CustomOAuth2UserService.java
	│				│	├── LOLService.java
	│				│	├── LOLServiceImpl.java
	│				│	├── MailService.java
	│				│	├── MailServiceImpl.java
	│				│	├── RoomCommentService.java
	│				│	├── RoomCommentServiceImpl.java
	│				│	├── RoomService.java
	│				│	├── RoomServiceImpl.java
	│				│	├── SessionService.java
	│				│	├── SessionServiceImpl.java
	│				│	├── UserService.java
	│				│	├── UserServiceImpl.java
	│				│	├── VoteService.java
	│				│	└── VoteServiceImpl.java
	│				├── util
	│				│	├── AwsService.java
	│				│	├── BaseControllerAdvice.java
	│				│	├── CookieUtil.java
	│				│	├── DeleteUserService.java
	│				│	├── LolTier.java
	│				│	├── RedisService.java
	│				│	├── SetCookie.java
	│				│	└── SnsType.java
	│				├── BackendApplication.java
	└── resources
		├── application.properties
		└── application-prod.properties
		
```

## ERD

![ERD](/uploads/c1048986e6799d1f2944abde8c222566/ERD.jpg)


## API Docs

[API Docs](https://documenter.getpostman.com/view/17324798/UzXKUxjY)

