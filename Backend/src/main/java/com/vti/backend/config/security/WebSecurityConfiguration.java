package com.vti.backend.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class WebSecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/auth/login").permitAll()
                        .requestMatchers("/api/v1/accounts/register").permitAll()
                        .requestMatchers("/api/v1/accounts/resetPassword").permitAll()
                        .requestMatchers("/api/v1/accounts/change-password").permitAll()
                        .requestMatchers("/api/v1/accounts/savePassword").permitAll()
                        .requestMatchers("/api/v1/accounts/update-password/username/**").permitAll()
                        .requestMatchers("/api/v1/accounts/**").hasAuthority("ADMIN")
                        .requestMatchers("/api/v1/departments/**").hasAuthority("ADMIN")
                        .anyRequest().authenticated()
                )
                .httpBasic(withDefaults()) // Sử dụng cấu hình mặc định cho Basic Authentication
                .cors(cors -> cors.configurationSource(corsConfigurationSource())); // Cấu hình CORS

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000"); // Cho phép frontend từ localhost:3000
        configuration.addAllowedMethod("*"); // Cho phép tất cả các phương thức HTTP (GET, POST, ...).
        configuration.addAllowedHeader("*"); // Cho phép tất cả các header.
        configuration.setAllowCredentials(true); // Cho phép cookie

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Áp dụng CORS cho tất cả các đường dẫn
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
