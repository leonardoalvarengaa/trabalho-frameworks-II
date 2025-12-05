package com.projetovagas.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // habilita CORS usando o CorsConfigurationSource bean definido abaixo
            .cors(cors -> {})
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // liberar endpoints de autenticação
                .requestMatchers("/auth/**").permitAll()
                // liberar GET público para listar vagas (ajuste se quiser proteger)
                .requestMatchers(HttpMethod.GET, "/vagas/**").permitAll()
                // outras requisições precisam de autenticação
                .anyRequest().authenticated()
            )
            // adiciona o filtro de JWT antes do UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // expõe AuthenticationManager (necessário para autenticação programática)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // OBS: não definimos PasswordEncoder aqui porque já existe um bean 'passwordEncoder'
    // em outro lugar do projeto (SecurityBeans). Evitamos duplicação.

    // Configuração CORS: ajuste origins se usar outras portas/domínios
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

    // Lista segura de origins: coloque os domínios que irão acessar sua API
        config.setAllowedOrigins(List.of(
            "http://localhost:5173", // dev
            "http://localhost:3000", // dev alternativo
            "https://trab-frameworks-ii.vercel.app", // seu Vercel (ajuste se for outro)
            "https://trab-frameworks-ii-git-main-leonardo-s-projects-d7597549.vercel.app", // alternativa (se usar)
            "https://projeto-vagas-backend-9i0c.onrender.com" // opcional
        ));

        // se quiser DEBUG rápido (NÃO deixar em produção com credentials=true):
        // config.setAllowedOrigins(List.of("*"));

        config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
