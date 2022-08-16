package com.ssafy.backend.config;

import com.ssafy.backend.config.properties.AppProperties;
import com.ssafy.backend.handler.security.OAuth2AuthenticationFailureHandler;
import com.ssafy.backend.handler.security.OAuth2AuthenticationSuccessHandler;
import com.ssafy.backend.model.repository.LolAuthRepository;
import com.ssafy.backend.model.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.security.JwtProvider;
import com.ssafy.backend.service.CustomOAuth2UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    private final AppProperties appProperties;
    private final CustomOAuth2UserService oAuth2UserService;


    private final UserRepository userRepository;

    private final LolAuthRepository lolAuthRepository;

    private final JwtProvider jwtProvider;

    /**
     * 인증 실패 처리 핸들러
     */
    private final AuthenticationEntryPoint authenticationEntryPointHandler;

    /**
     * 권한 거부 처리 핸들러
     */
    private final AccessDeniedHandler webAccessDeniedHandler;

    /**
     * 인증이 필요없는 URI
     */
    private static final String[] GET_PUBLIC_URI = {
            "/user/auth/*",
            "/user/id/*",
            "/user/name/*",
            "/auth/refresh",
            "/v3/api-docs",
            "/swagger*/**",
            "/user/password/**",
            "/user/reset-token/**",
            "/room/top",
            "/room",
            "/boards"
    };

    private static final String[] POST_PUBLIC_URI = {
            "/user",
            "/auth",
            "/v3/api-docs",
            "/swagger*/**",
            "/aws*/**",
            "/session/callback",
            "/editor/upload"
    };

    private static final String[] DELETE_PUBLIC_URI = {
            "/user/reset-token/**"
    };

    private final String frontUrl;

    public SecurityConfig(AppProperties appProperties, CustomOAuth2UserService oAuth2UserService,
                          UserRepository userRepository, LolAuthRepository lolAuthRepository, JwtProvider jwtProvider,
                          AuthenticationEntryPoint authenticationEntryPointHandler,
                          AccessDeniedHandler webAccessDeniedHandler, @Value("${frontend}") String frontUrl) {
        this.appProperties = appProperties;
        this.oAuth2UserService = oAuth2UserService;
        this.userRepository = userRepository;
        this.lolAuthRepository = lolAuthRepository;
        this.jwtProvider = jwtProvider;
        this.authenticationEntryPointHandler = authenticationEntryPointHandler;
        this.webAccessDeniedHandler = webAccessDeniedHandler;
        this.frontUrl = frontUrl;
    }

    /**
     * Spring 인증 과정 무시 URI
     * @return Web Ignoring
     */
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring().antMatchers(HttpMethod.GET,GET_PUBLIC_URI).antMatchers(HttpMethod.POST, POST_PUBLIC_URI)
                .antMatchers(HttpMethod.DELETE, DELETE_PUBLIC_URI)
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.httpBasic().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable();


        http
                .authorizeRequests()
                .antMatchers("/user/reauth").hasRole("GUEST")
                .antMatchers(HttpMethod.DELETE, "/auth").hasAnyRole("GUEST", "USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/user").hasAnyRole("GUEST", "USER", "ADMIN")
                .anyRequest().hasAnyRole("USER", "ADMIN");

        http
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPointHandler)
                .accessDeniedHandler(webAccessDeniedHandler);

        http
                .apply(new JwtSecurityConfig(jwtProvider));

        http
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/oauth2/authorization")
                .authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository())
                .and()
                .redirectionEndpoint()
                .baseUri("/login/oauth2/code/*")
                .and()
                .userInfoEndpoint()
                .userService(oAuth2UserService)
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler())
                .failureHandler(oAuth2AuthenticationFailureHandler());

        return http.build();
    }

    /*
     * 쿠키 기반 인가 Repository
     * 인가 응답을 연계 하고 검증할 때 사용.
     * */
    @Bean
    public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository() {
        return new OAuth2AuthorizationRequestBasedOnCookieRepository();
    }

    /*
     * Oauth 인증 성공 핸들러
     * */
    @Bean
    public OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
        return new OAuth2AuthenticationSuccessHandler(
                jwtProvider,
                appProperties,
                userRepository,
                oAuth2AuthorizationRequestBasedOnCookieRepository(),
                lolAuthRepository);
    }

    /*
     * Oauth 인증 실패 핸들러
     * */
    @Bean
    public OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler() {
        return new OAuth2AuthenticationFailureHandler(oAuth2AuthorizationRequestBasedOnCookieRepository());
    }


    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin(frontUrl);
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


}
