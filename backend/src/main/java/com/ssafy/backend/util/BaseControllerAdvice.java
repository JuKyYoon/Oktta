package com.ssafy.backend.util;

import com.ssafy.backend.model.exception.*;
import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.model.response.MessageResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.sql.SQLException;

@RestControllerAdvice
public class BaseControllerAdvice {

    private static final Logger LOGGER = LoggerFactory.getLogger(BaseControllerAdvice.class);

    @Value("${response.fail}")
    private String failMsg;

    @ExceptionHandler(SessionNotFoundException.class)
    public ResponseEntity<BaseResponseBody> sessionNotFoundException(Exception e, HttpServletRequest req) {
        LOGGER.debug("Session Not Found");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(MessageResponse.of(404, failMsg, "Session Not Found"));
    }

    @ExceptionHandler(DuplicatedEnterSession.class)
    public ResponseEntity<BaseResponseBody> duplicatedEnterSession(Exception e, HttpServletRequest req) {
        LOGGER.debug("Already in the session");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(MessageResponse.of(403, failMsg, "Already In Session"));
    }

    @ExceptionHandler(InvalidSessionCreate.class)
    public ResponseEntity<BaseResponseBody> InvalidSessionCreateException(Exception e, HttpServletRequest req) {
        LOGGER.debug("Room Create Fail Because it's not my room");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(MessageResponse.of(403, failMsg, "Not My Room"));
    }

    @ExceptionHandler(NumberFormatException.class)
    public ResponseEntity<BaseResponseBody> numberFormatException(Exception e, HttpServletRequest req) {
        LOGGER.debug("String to Number Fail");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(MessageResponse.of(400, failMsg, "Not Number"));
    }

    @ExceptionHandler(RoomNotFoundException.class)
    public ResponseEntity<BaseResponseBody> roomNotFoundExceptionion(Exception e, HttpServletRequest req) {
        LOGGER.debug("Room Not Found");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(MessageResponse.of(404, failMsg, "Room Not Found"));
    }

    @ExceptionHandler(VoteNotFoundException.class)
    public ResponseEntity<BaseResponseBody> voteNotFoundException(Exception e, HttpServletRequest req) {
        LOGGER.debug("Vote Not Found");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(MessageResponse.of(404, failMsg, "Vote Not Found"));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<BaseResponseBody> dataIntegrityViolationException(Exception e, HttpServletRequest req) {
        LOGGER.debug("SQL Integrity Error");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(MessageResponse.of(500, failMsg, "SQL Integrity Error"));
    }

    @ExceptionHandler(PasswordNotMatchException.class)
    public ResponseEntity<BaseResponseBody> passwordNotMatchException(Exception e, HttpServletRequest req) {
        LOGGER.debug("Wrong Password");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageResponse.of(200, failMsg, "Wrong Password"));
    }

    @ExceptionHandler(ExpiredEmailAuthKeyException.class)
    public ResponseEntity<BaseResponseBody> emilaAuthExpireException(Exception e, HttpServletRequest req) {
        LOGGER.debug("Expired Email Auth");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageResponse.of(200, failMsg, "Email Auth Expired"));
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<BaseResponseBody> userNotFoundException(Exception e, HttpServletRequest req) {
        LOGGER.debug("User NOT Found");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageResponse.of(200, failMsg, "User Not Found"));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<BaseResponseBody> authException(Exception e, HttpServletRequest req) {
        LOGGER.debug("AUTH ERROR");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.OK)
                .body(BaseResponseBody.of(200, failMsg));
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<BaseResponseBody> sqlException(Exception e, HttpServletRequest req) {
        LOGGER.debug("SQL ERROR");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(BaseResponseBody.of(500, failMsg));
    }

    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<BaseResponseBody> mailSendException(Exception e, HttpServletRequest req) {
        LOGGER.debug("EMAIL SEND ERROR");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(BaseResponseBody.of(500, failMsg));
    }

    @ExceptionHandler(BoardNotFoundException.class)
    public ResponseEntity<BaseResponseBody> BoardNotFoundException(Exception e, HttpServletRequest req){
        LOGGER.debug("Board NOT FOUND");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(BaseResponseBody.of(404, failMsg));
    }

    
    @ExceptionHandler(CommentNotFoundException.class)
    public ResponseEntity<BaseResponseBody> CommentNotFoundException(Exception e, HttpServletRequest req){
        LOGGER.debug("Comment NOT FOUND");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(BaseResponseBody.of(404, failMsg));
    }

    @ExceptionHandler(SocialUserException.class)
    public ResponseEntity<BaseResponseBody> SocialUserException(Exception e, HttpServletRequest req){
        LOGGER.debug("SOCIAL USER ERROR");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());
        
        return ResponseEntity.status(HttpStatus.OK)
                .body(BaseResponseBody.of(200, failMsg));
    }

    @ExceptionHandler(FileTypeException.class)
    public ResponseEntity<BaseResponseBody> FileTypeException(Exception e, HttpServletRequest req){
        LOGGER.debug("FILE TYPE ERROR");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(BaseResponseBody.of(403, failMsg));
    }

    @ExceptionHandler(WebClientResponseException.NotFound.class)
    public ResponseEntity<BaseResponseBody> WebClientNotFoundException(Exception e, HttpServletRequest req){
        LOGGER.debug("WEB CLIENT NOT FOUND ERROR");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(BaseResponseBody.of(404, failMsg));

    }

    @ExceptionHandler(InputDataNullException.class)
    public ResponseEntity<BaseResponseBody> MatchNullException(Exception e, HttpServletRequest req){
        LOGGER.debug("MATCH NULL ERROR");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(BaseResponseBody.of(400, failMsg));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponseBody> unknownException(Exception e, HttpServletRequest req) {
        LOGGER.debug("UNKNOWN ERROR");
        LOGGER.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        LOGGER.error(req.getRequestURI());
        LOGGER.error(e.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(BaseResponseBody.of(500, failMsg));
    }
}
