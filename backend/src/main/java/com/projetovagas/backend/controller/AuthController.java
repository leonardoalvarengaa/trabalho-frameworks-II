package com.projetovagas.backend.controller;

import com.projetovagas.backend.model.AppUser;
import com.projetovagas.backend.repository.AppUserRepository;
import com.projetovagas.backend.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AppUserRepository repo;
  private final PasswordEncoder encoder;
  private final AuthenticationManager authManager;
  private final JwtUtil jwtUtil;

  public AuthController(AppUserRepository repo, PasswordEncoder encoder, AuthenticationManager authManager, JwtUtil jwtUtil) {
    this.repo = repo;
    this.encoder = encoder;
    this.authManager = authManager;
    this.jwtUtil = jwtUtil;
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody Map<String,String> body) {
    String username = body.get("username"), pwd = body.get("password");
    if (username == null || pwd == null) return ResponseEntity.badRequest().body(Map.of("error","username/password required"));
    if (repo.findByUsername(username).isPresent()) return ResponseEntity.badRequest().body(Map.of("error","username exists"));
    AppUser u = new AppUser();
    u.setUsername(username);
    u.setPassword(encoder.encode(pwd));
    repo.save(u);
    return ResponseEntity.ok(Map.of("ok", true));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Map<String,String> body) {
    try {
      String username = body.get("username"), pwd = body.get("password");
      authManager.authenticate(new UsernamePasswordAuthenticationToken(username, pwd));
      var userDetails = org.springframework.security.core.userdetails.User.withUsername(username).password("").roles("USER").build();
      String token = jwtUtil.generateToken(userDetails);
      return ResponseEntity.ok(Map.of("token", token));
    } catch (AuthenticationException ex) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","invalid credentials"));
    }
  }
}
