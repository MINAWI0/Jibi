package com.ensa.jibi.backend.services;

import com.ensa.jibi.backend.domain.dto.UserDto;
import com.ensa.jibi.backend.domain.entities.Admin;
import com.ensa.jibi.backend.domain.entities.Agent;
import com.ensa.jibi.backend.domain.entities.User;
import com.ensa.jibi.backend.domain.requests.LoginRequest;
import com.ensa.jibi.backend.mappers.UserMapper;
import com.ensa.jibi.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private PasswordEncoder passwordEncoder;


    @Autowired
    private UserMapper userMapper;

    public UserDto createUser(UserDto userDto) {
        User user = userMapper.mapFrom(userDto); // Use mapper to convert UserDto to User
//        user.setPassword(passwordEncoder.encode(userDto.getPassword())); // Hash password before saving
        return userMapper.mapTo(userRepository.save(user));
    }

    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(userMapper::mapTo).collect(Collectors.toList()); // Use mapper to convert User to UserDto
    }

    public User getUserByUsernameAndPassword(LoginRequest loginRequest) {
        return userRepository.findByUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
    }
    public Boolean existsByUsernameAndPassword(LoginRequest loginRequest) {
        return userRepository.
                existsByUsernameAndPassword(loginRequest.getUsername(),
                        loginRequest.getPassword());
    }

    public boolean isAdmin(LoginRequest loginRequest) {
        User user = getUserByUsernameAndPassword(loginRequest);
        return user != null && user instanceof Admin; // Check if user is an Admin instance
    }

    public boolean isAgent(LoginRequest loginRequest) {
        User user = getUserByUsernameAndPassword(loginRequest);
        return user != null && user instanceof Agent; // Check if user is an Agent instance
    }

    // You can add other methods like getUserById, updateUser etc. based on your needs
}
