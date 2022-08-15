package com.ssafy.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${frontend}")
    private String frontUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
//		default 설정.
//		Allow all origins.
//		Allow "simple" methods GET, HEAD and POST.
//		Allow all headers.
//		Set max age to 1800 seconds (30 minutes).
        registry.addMapping("/**")
//			.allowedOrigins("*")
                .allowedOrigins(frontUrl)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//			.allowedHeaders("*")
                .allowCredentials(true) // 쿠키 허용
                .maxAge(6000);
    }


    //	Swagger UI 실행시 404처리
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/swagger-ui/index.html**").addResourceLocations("classpath:/META-INF/resources/swagger-ui/index.html");
//        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
//    }
}
