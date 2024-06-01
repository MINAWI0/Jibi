package com.ensa.jibi.jwt.services;

import com.ensa.jibi.backend.services.UserService;
import com.ensa.jibi.jwt.models.UserPrincipal;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticateService implements UserDetailsService {

  private final UserService userService;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    var userEntity = userService.getUserByUsername(username);
    return new UserPrincipal(userEntity);
  }

}
