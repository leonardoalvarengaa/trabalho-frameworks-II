package com.projetovagas.backend.security;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.projetovagas.backend.service.AppUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.*;
import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;
  private final AppUserDetailsService userDetailsService;

  public JwtFilter(JwtUtil jwtUtil, AppUserDetailsService uds) {
    this.jwtUtil = jwtUtil; this.userDetailsService = uds;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
      throws IOException, jakarta.servlet.ServletException {
    String auth = req.getHeader("Authorization");
    if (auth != null && auth.startsWith("Bearer ")) {
      String token = auth.substring(7);
      try {
        String username = jwtUtil.extractUsername(token);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
          UserDetails user = userDetailsService.loadUserByUsername(username);
          if (jwtUtil.validateToken(token, user)) {
            UsernamePasswordAuthenticationToken a =
              new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(a);
          }
        }
      } catch (Exception ignored) { /* invalid token -> not authenticated */ }
    }
    chain.doFilter(req, res);
  }
}
