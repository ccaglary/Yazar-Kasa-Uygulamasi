package com.urun_takip.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // /api/ altındaki tüm adresler için
                .allowedOrigins("http://localhost:5173") // Sadece React uygulamamızdan gelen isteklere izin ver
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // İzin verilen HTTP metotları
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}

