package com.ssafy.backend.util;

import com.ssafy.backend.model.exception.BoardNotFoundException;
import com.ssafy.backend.model.exception.ExpiredEmailAuthKeyException;
import com.ssafy.backend.model.exception.PasswordNotMatchException;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.model.response.MessageResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.sql.SQLException;

@RestControllerAdvice
public class BaseControllerAdvice {

    private static final Logger LOGGER = LoggerFactory.getLogger(BaseControllerAdvice.class);

    @Value("${response.fail}")
    private String failMsg;

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
