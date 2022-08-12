package com.ssafy.backend.handler.security;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * 401 에러 발생 및 오류 코드 전달
 * @author JuKyYoon
 *
 */
@Component
public class AuthenticationEntryPointHandler implements AuthenticationEntryPoint {
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationEntryPointHandler.class);
    /**
     * 401 처리하기 위한 메소드
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        String exception = (String) request.getAttribute("exception");

        // 토큰 없거나 DB에 아이디 없다.
        if(exception == null) {
            setResponse(response, "403", "no token");
            return;
        }

        // 만료된 경우에만 401보낸다.
        if(exception.contentEquals("ExpiredJwtException")) {
            setResponse(response, "401", "unauthorized");
        } else {
            setResponse(response, "403", "forbidden");
        }
    }

    /**
     * 인증 실패 시 에러 반환
     */
    private void setResponse(HttpServletResponse response, String code, String msg) throws IOException {
        JSONObject json = new JSONObject();
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("utf-8");
        response.setStatus("401".equals(code) ? HttpServletResponse.SC_UNAUTHORIZED : HttpServletResponse.SC_FORBIDDEN);
        json.put("status", code);
        json.put("result", msg);
        response.getWriter().print(json);
    }
}
