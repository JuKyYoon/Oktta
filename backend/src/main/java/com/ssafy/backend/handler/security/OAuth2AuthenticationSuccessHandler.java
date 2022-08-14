package com.ssafy.backend.handler.security;

import com.ssafy.backend.config.properties.AppProperties;
import com.ssafy.backend.info.OAuth2UserInfo;
import com.ssafy.backend.info.OAuth2UserInfoFactory;
import com.ssafy.backend.model.entity.ProviderType;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.entity.LolAuth;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.repository.LolAuthRepository;
import com.ssafy.backend.model.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.security.JwtProvider;
import com.ssafy.backend.util.CookieUtil;
import com.ssafy.backend.util.SetCookie;
import com.ssafy.backend.util.SnsType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Optional;

import static com.ssafy.backend.model.repository.OAuth2AuthorizationRequestBasedOnCookieRepository.REDIRECT_URI_PARAM_COOKIE_NAME;


@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    private final AppProperties appProperties;
    private final UserRepository userRepository;
    private final OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;
    private final LolAuthRepository lolAuthRepository;

    public OAuth2AuthenticationSuccessHandler(JwtProvider jwtProvider, AppProperties appProperties, UserRepository userRepository, OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository, LolAuthRepository lolAuthRepository) {
        this.jwtProvider = jwtProvider;
        this.appProperties = appProperties;
        this.userRepository = userRepository;
        this.authorizationRequestRepository = authorizationRequestRepository;
        this.lolAuthRepository = lolAuthRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = CookieUtil.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);
//        if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
//            throw new IllegalArgumentException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
//        }
        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        ProviderType providerType = ProviderType.valueOf(authToken.getAuthorizedClientRegistrationId().toUpperCase());

        OidcUser user = ((OidcUser) authentication.getPrincipal());
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());

        String userId = userInfo.getId();
        String accessToken = jwtProvider.generateAccessToken(userId);
        String refreshToken = jwtProvider.generateRefreshToken(userId);

        SetCookie.setRefreshTokenCookie(response, refreshToken);
        User loginUser = userRepository.findById(userInfo.getId()).orElseThrow(
                () -> new UserNotFoundException("user not found")
        );

        LolAuth lolAuth = lolAuthRepository.findByUserId(loginUser.getId()).orElse(null);
        String tier = lolAuth != null ? String.valueOf(lolAuth.getTier()) : "";
        String summonerName = lolAuth != null ? lolAuth.getSummonerName() : "";
        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", accessToken)
                .queryParam("nickName", loginUser.getNickname())
                .queryParam("snsType", SnsType.getSnsType(loginUser.getSnsType()).toString())
                .queryParam("tier", tier)
                .queryParam("summonerName", summonerName).encode(StandardCharsets.UTF_8)
                .build().toUriString();
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean hasAuthority(Collection<? extends GrantedAuthority> authorities, String authority) {
        if (authorities == null) {
            return false;
        }

        for (GrantedAuthority grantedAuthority : authorities) {
            if (authority.equals(grantedAuthority.getAuthority())) {
                return true;
            }
        }
        return false;
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);

        return appProperties.getOauth2().getAuthorizedRedirectUris()
                .stream()
                .anyMatch(authorizedRedirectUri -> {
                    // Only validate host and port. Let the clients use different paths if they want to
                    URI authorizedURI = URI.create(authorizedRedirectUri);
                    if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                            && authorizedURI.getPort() == clientRedirectUri.getPort()) {
                        return true;
                    }
                    return false;
                });
    }
}
