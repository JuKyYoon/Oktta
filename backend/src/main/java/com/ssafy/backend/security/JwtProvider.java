package com.ssafy.backend.security;

import io.jsonwebtoken.*;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtProvider {

    private static final String HEADER_TOKEN_PREFIX = "Bearer ";

    // Logger Setting
    private static Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.access-token-expire-time}")
    private long accessTokenExpireTime;

    @Value("${jwt.refresh-token-expire-time}")
    private long refreshTokenExpireTime;

    @Autowired
    private MyUserDetailService myUserDetailService;

    /**
     * Key Encryption
     */
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    /**
     * generate a AccessToken
     */
    public String generateAccessToken(Authentication authentication) {
        Claims claims = Jwts.claims().setSubject(authentication.getName());
        Date now = new Date();
        Date expireTime = new Date(now.getTime() + accessTokenExpireTime);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expireTime)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    /**
     * accessToken 이용해서 인증객체 가져온다.
     * @param token
     * @return
     */
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = myUserDetailService.loadUserByUsername(this.getUserId(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    /**
     * accessToken 이용해서 파싱 후, 유저 아이디 가져온다.
     * @param token
     * @return
     */
    public String getUserId(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * 헤더에서 토큰을 가져온다.
     * @param req
     * @return
     */
    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");

        if (bearerToken != null && bearerToken.startsWith(HEADER_TOKEN_PREFIX)) {
            return bearerToken.substring(HEADER_TOKEN_PREFIX.length());
        }
        return null;
    }

    /**
     * 토큰의 유효성을 체크한다.
     * @param token
     * @return
     */
    public boolean validateToken(ServletRequest request, String token) {
        String attrName = "exception";
        try {
            logger.debug("[JwtProvider.validateToken(token)]");
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT Signature", e);
            request.setAttribute(attrName, "SignatureException");
            return false;
        } catch (MalformedJwtException e) {
            logger.error("Invalid Jwt token", e);
            request.setAttribute(attrName, "MalformedJwtException");
            return false;
        } catch (ExpiredJwtException e) {
            logger.error("Expired Jwt token", e);
            request.setAttribute(attrName, "ExpiredJwtException");
            return false;
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT Token", e);
            request.setAttribute(attrName, "UnsupportedJwtException");
            return false;
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty", e);
            request.setAttribute(attrName, "IllegalArgumentException");
            return false;
        } catch (Exception e) {
            logger.error("JWT validation Fail", e);
            request.setAttribute(attrName, "Exception");
            return false;
        }
    }

}
