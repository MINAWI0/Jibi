package com.ensa.jibi.jwt.services;



import com.ensa.jibi.backend.domain.entities.Role;
import com.ensa.jibi.backend.domain.entities.User;
import com.ensa.jibi.backend.repositories.RoleRepository;
import com.ensa.jibi.backend.services.UserService;
import com.ensa.jibi.jwt.models.UserPrincipal;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

@Service
@AllArgsConstructor
public class ApplicationUserDetailsService implements UserDetailsService {

  private final UserService userService;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;
  private final ModelMapper mapper;


  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    var userEntity = userService.getUserByUsername(email);
    return new UserPrincipal(userEntity);
  }


  public User authenticate(String email, String password)
          throws NoSuchAlgorithmException {
    if (email.isEmpty() || password.isEmpty()) {
      throw new BadCredentialsException("Unauthorized");
    }

    var userEntity = userService.getUserByUsername(email);

    if (userEntity == null) {
      throw new BadCredentialsException("Unauthorized");
    }

    if (!passwordEncoder.matches(password, userEntity.getPassword())) {
      throw new BadCredentialsException("Unauthorized");
    }
    return userEntity;

  }

  public Role getRole(Long id){
    return this.roleRepository.findRoleByUsersIn(Arrays.asList(mapper.map(userService.getUserById(id),User.class)));
  }
}
