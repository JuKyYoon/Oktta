package com.ssafy.backend.util;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

public class SetCookie {
    public static void setRefreshTokenCookie(HttpServletResponse res, String token) {
        Cookie cookie = new Cookie("refreshToken", token);

        // 1 week
        cookie.setMaxAge(14 * 24 * 60 * 60);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        res.addCookie(cookie);
    }

    public static void deleteRefreshTokenCookie(HttpServletResponse res) {
        Cookie myCookie = new Cookie("refreshToken", null);
        myCookie.setMaxAge(0); // 쿠키의 expiration 타임을 0으로 하여 없앤다.
        myCookie.setPath("/"); // 모든 경로에서 삭제 됬음을 알린다.
        res.addCookie(myCookie);
    }

}
