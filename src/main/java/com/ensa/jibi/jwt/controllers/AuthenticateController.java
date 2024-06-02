package com.ensa.jibi.jwt.controllers;


import com.ensa.jibi.backend.domain.entities.Role;
import com.ensa.jibi.backend.domain.entities.User;
import com.ensa.jibi.backend.repositories.RoleRepository;
import com.ensa.jibi.backend.services.UserService;
import com.ensa.jibi.jwt.models.AuthenticationRequest;
import com.ensa.jibi.jwt.models.AuthenticationResponse;
import com.ensa.jibi.jwt.models.UserPrincipal;
import com.ensa.jibi.jwt.services.AuthenticateService;
import com.ensa.jibi.jwt.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

@RestController
@AllArgsConstructor
public class AuthenticateController implements UserDetailsService {
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtTokenUtil;
  private final RoleRepository roleRepository;
  private final ModelMapper mapper;
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    var userEntity = userService.getUserByUsername(username);
    return new UserPrincipal(userEntity);
  }

  @PostMapping(value = "/login")
  public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest authenticationRequest)
          throws NoSuchAlgorithmException {
    if (authenticationRequest.getUsername().isEmpty() || authenticationRequest.getPassword().isEmpty()) {
      throw new BadCredentialsException("Unauthorized");
    }

    var userEntity = userService.getUserByUsername(authenticationRequest.getUsername());

    if (userEntity == null) {
      return ResponseEntity.badRequest().body("User with the given UserName doesn't exist !");
    }

    if (!passwordEncoder.matches(authenticationRequest.getPassword(), userEntity.getPassword())) {
      return ResponseEntity.badRequest().body("The given Password is incorrect !");
    }
    Role role = getRole(userEntity.getId());
    UserPrincipal userDetails = new UserPrincipal(userEntity);
    var jwt = jwtTokenUtil.generateToken(userDetails);
    return ResponseEntity.ok().body( new AuthenticationResponse(role,jwt,userEntity.getId()));
  }

  public Role getRole(Long id){
    return this.roleRepository.findRoleByUsersIn(Arrays.asList(mapper.map(userService.getUserById(id), User.class)));
  }
}
