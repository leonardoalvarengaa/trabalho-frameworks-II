package com.projetovagas.backend.security;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.projetovagas.backend.service.AppUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
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
    throws IOException, ServletException {
  String auth = req.getHeader("Authorization");
  if (auth != null && auth.startsWith("Bearer ")) {
    String token = auth.substring(7);
    try {
      // LOG: header + token (cuidado: não comitar logs com token em produção)
      System.out.println("JwtFilter: Authorization header present. token startsWith: " + (token.length() > 10 ? token.substring(0,10) + "..." : token));

      String username = jwtUtil.extractUsername(token);
      System.out.println("JwtFilter: extractUsername -> " + username);

      if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        UserDetails user = userDetailsService.loadUserByUsername(username);
        System.out.println("JwtFilter: loaded user -> " + user.getUsername() + ", authorities=" + user.getAuthorities());

        boolean valid = jwtUtil.validateToken(token, user);
        System.out.println("JwtFilter: validateToken -> " + valid);

        if (valid) {
          UsernamePasswordAuthenticationToken a =
              new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
          a.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
          SecurityContextHolder.getContext().setAuthentication(a);
          System.out.println("JwtFilter: Authentication set for user " + username);
        } else {
          System.out.println("JwtFilter: token invalid for user " + username);
        }
      }
    } catch (Exception e) {
      System.out.println("JwtFilter: exception while processing token: " + e.getMessage());
      // e.printStackTrace(); // opcional para debug mais detalhado
    }
  } else {
    System.out.println("JwtFilter: no Authorization header or not Bearer");
  }
  chain.doFilter(req, res);
}

}
