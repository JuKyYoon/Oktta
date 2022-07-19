package com.ssafy.backend.config;

import com.ssafy.backend.security.JwtProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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

@Configuration
@EnableWebSecurity
public class SecurityConfig {

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
    private static final String[] PUBLIC_URI = {
            "/users/signup",
            "/auth/signin"
    };

    public SecurityConfig(JwtProvider jwtProvider, AuthenticationEntryPoint authenticationEntryPointHandler, AccessDeniedHandler webAccessDeniedHandler) {
        this.jwtProvider = jwtProvider;
        this.authenticationEntryPointHandler = authenticationEntryPointHandler;
        this.webAccessDeniedHandler = webAccessDeniedHandler;
    }

    /**
     * Spring 인증 과정 무시 URI
     * @return
     */
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers(PUBLIC_URI);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http
                .authorizeRequests()
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

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }




}
