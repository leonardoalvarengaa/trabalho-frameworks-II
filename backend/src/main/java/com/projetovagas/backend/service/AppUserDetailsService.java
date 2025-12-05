package com.projetovagas.backend.service;

import com.projetovagas.backend.model.AppUser;
import com.projetovagas.backend.repository.AppUserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class AppUserDetailsService implements UserDetailsService {

  private final AppUserRepository repo;
  public AppUserDetailsService(AppUserRepository repo) { this.repo = repo; }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    AppUser u = repo.findByUsername(username)
      .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    return User.builder()
      .username(u.getUsername())
      .password(u.getPassword())
      .roles(u.getRole().replace("ROLE_",""))
      .build();
  }
}
