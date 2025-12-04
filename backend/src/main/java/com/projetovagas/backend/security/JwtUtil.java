package com.projetovagas.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.Date;
import java.time.temporal.ChronoUnit;

@Component
public class JwtUtil {

  @Value("${jwt.secret}")
  private String secret; // set via env var in Render

  public String generateToken(UserDetails user) {
    Instant now = Instant.now();
    return Jwts.builder()
      .setSubject(user.getUsername())
      .setIssuedAt(Date.from(now))
      .setExpiration(Date.from(now.plus(6, ChronoUnit.HOURS)))
      .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS256)
      .compact();
  }

  public String extractUsername(String token) {
    return Jwts.parserBuilder()
      .setSigningKey(secret.getBytes())
      .build()
      .parseClaimsJws(token)
      .getBody()
      .getSubject();
  }

  public boolean validateToken(String token, UserDetails user) {
    try {
      String username = extractUsername(token);
      return username.equals(user.getUsername());
    } catch (Exception e) {
      return false;
    }
  }
}
