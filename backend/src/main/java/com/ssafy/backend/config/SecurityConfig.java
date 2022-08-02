package com.ssafy.backend.config;

import com.ssafy.backend.security.JwtProvider;
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
            "/auth/refresh/**",
            "/v3/api-docs",
            "/session/**",
            "/swagger*/**",
            "/user/password/**",
            "/user/reset-token/**"
    };

    private static final String[] POST_PUBLIC_URI = {
            "/user",
            "/auth",
            "/session/**",
            "/v3/api-docs",
            "/swagger*/**"
    };

    private static final String[] DELETE_PUBLIC_URI = {
            "/user/reset-token/**"
    };

    /**
     * Security Config Constructor Injection
     */
    public SecurityConfig(JwtProvider jwtProvider, AuthenticationEntryPoint authenticationEntryPointHandler,
                          AccessDeniedHandler webAccessDeniedHandler) {
        this.jwtProvider = jwtProvider;
        this.authenticationEntryPointHandler = authenticationEntryPointHandler;
        this.webAccessDeniedHandler = webAccessDeniedHandler;
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
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


}
