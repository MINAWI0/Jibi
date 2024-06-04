package com.ensa.jibi.jwt.controllers;


import com.ensa.jibi.backend.domain.entities.Role;
import com.ensa.jibi.backend.domain.entities.User;
import com.ensa.jibi.jwt.models.AuthenticationRequest;
import com.ensa.jibi.jwt.models.AuthenticationResponse;
import com.ensa.jibi.jwt.models.UserPrincipal;
import com.ensa.jibi.jwt.services.ApplicationUserDetailsService;
import com.ensa.jibi.jwt.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthenticateController {
  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtTokenUtil;
  private final ApplicationUserDetailsService userDetailsService;


  @RequestMapping(value = "/login")
  public ResponseEntity<?> authenticate(
    @RequestBody AuthenticationRequest req
  ) throws Exception {
    User user;
    try {
      user = userDetailsService.authenticate(req.getUsername(), req.getPassword());
    } catch (BadCredentialsException e) {
      return ResponseEntity.badRequest().body("Incorrect username or password");
    }
    Role role = userDetailsService.getRole(user.getId());
    UserPrincipal userDetails = new UserPrincipal(user);
    System.out.println();
    var jwt = jwtTokenUtil.generateToken(userDetails);
    return ResponseEntity.ok().body( new AuthenticationResponse(role,jwt,user.getId()));
  }

}
