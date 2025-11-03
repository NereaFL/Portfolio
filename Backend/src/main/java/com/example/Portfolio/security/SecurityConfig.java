package com.example.Portfolio.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // ✅ Archivos estáticos (PDF, imágenes, etc.)
                .requestMatchers(
                    "/assets/**",   // por si sirves recursos estáticos
                    "/diplomas/**"  // ⚠️ ahora tus PDF serán accesibles públicamente
                ).permitAll()

                // ✅ Endpoints públicos
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(
                    "/api/person/**",
                    "/api/experience/**",
                    "/api/courses/**",
                    "/api/projects/**",
                    "/api/education/**",
                    "/api/skills/**"
                ).permitAll()

                // ✅ Endpoints administrativos (ADMIN o ROLE_ADMIN)
                .requestMatchers(
                    "/api/person/admin/**",
                    "/api/experience/admin/**",
                    "/api/courses/admin/**",
                    "/api/projects/admin/**",
                    "/api/education/admin/**",
                    "/api/skills/admin/**"
                ).hasAnyAuthority("ADMIN", "ROLE_ADMIN")

                // 🔒 Todo lo demás requiere autenticación
                .anyRequest().authenticated()
            )
            // 🔧 Stateless JWT
            .securityContext(ctx -> ctx.requireExplicitSave(false))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // 🧱 Filtro JWT
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 🌐 CORS configuración
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(List.of("https://portfolio-rho-ten-cm7d10hpf5.vercel.app/"));
        cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        cfg.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept", "Origin", "X-Requested-With"));
        cfg.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }
}
