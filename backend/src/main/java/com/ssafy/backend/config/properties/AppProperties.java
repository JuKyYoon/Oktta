package com.ssafy.backend.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.ArrayList;
import java.util.List;

@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private final Auth auth = new Auth();
    private final OAuth2 oauth2 = new OAuth2();


    public Auth getAuth() {
        return auth;
    }

    public OAuth2 getOauth2() {
        return oauth2;
    }

    public static class Auth {
        private String tokenSecret;
        private long tokenExpiry;
        private long refreshTokenExpiry;

        public Auth() {
        }

        public Auth(String tokenSecret, long tokenExpiry, long refreshTokenExpiry) {
            this.tokenSecret = tokenSecret;
            this.tokenExpiry = tokenExpiry;
            this.refreshTokenExpiry = refreshTokenExpiry;
        }

        public String getTokenSecret() {
            return tokenSecret;
        }

        public void setTokenSecret(String tokenSecret) {
            this.tokenSecret = tokenSecret;
        }

        public long getTokenExpiry() {
            return tokenExpiry;
        }

        public void setTokenExpiry(long tokenExpiry) {
            this.tokenExpiry = tokenExpiry;
        }

        public long getRefreshTokenExpiry() {
            return refreshTokenExpiry;
        }

        public void setRefreshTokenExpiry(long refreshTokenExpiry) {
            this.refreshTokenExpiry = refreshTokenExpiry;
        }
    }

    public static final class OAuth2 {
        private List<String> authorizedRedirectUris = new ArrayList<>();

        public List<String> getAuthorizedRedirectUris() {
            return authorizedRedirectUris;
        }

        public OAuth2 authorizedRedirectUris(List<String> authorizedRedirectUris) {
            this.authorizedRedirectUris = authorizedRedirectUris;
            return this;
        }
    }
}
