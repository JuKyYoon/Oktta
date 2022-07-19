package com.ssafy.backend.handler.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
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

    /**
     * 401 처리하기 위한 메소드
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        String exception = (String) request.getAttribute("exception");

        // 토큰 없다
        if(exception == null) {
            set403Response(response, "403");
            return;
        }

        // 만료된 경우에만 401보낸다.
        if(exception.contentEquals("ExpiredJwtException")) {
            set401Response(response, "401");
            return;
        } else {
            set403Response(response, "403");
            return;
        }

    }

    /**
     * 401은 인증 실패로 재요청 받아들인다.
     * @param response
     * @param code
     * @throws IOException
     */
    private void set401Response(HttpServletResponse response, String code) throws IOException {
        JSONObject json = new JSONObject();
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("utf-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        json.put("status", "unauthorized");
        json.put("result", code);
        response.getWriter().print(json);
    }

    private void set403Response(HttpServletResponse response, String code) throws IOException {
        JSONObject json = new JSONObject();
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("utf-8");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        json.put("status", "forbidden");
        json.put("result", code);
        response.getWriter().print(json);
    }

}
