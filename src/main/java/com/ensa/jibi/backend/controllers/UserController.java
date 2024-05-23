package com.ensa.jibi.backend.controllers;

import com.ensa.jibi.backend.domain.dto.UserDto;
import com.ensa.jibi.backend.domain.entities.User;
import com.ensa.jibi.backend.domain.requests.LoginRequest;
import com.ensa.jibi.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/createUser")
    public ResponseEntity<UserDto> createUser( @RequestBody UserDto userDto) {
        UserDto createdUserDto = userService.createUser(userDto);
        return new ResponseEntity<>(createdUserDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> userDtos = userService.getAllUsers();
        return new ResponseEntity<>(userDtos, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser( @RequestBody LoginRequest loginRequest) {
        if (userService.isAdmin(loginRequest)) {
            // Handle successful admin login (return specific user data or token)

            return new ResponseEntity<>("Admin", HttpStatus.OK); // Replace with appropriate response
        } else if (userService.isAgent(loginRequest)) {
            // Handle successful agent login (return specific user data or token)
            return new ResponseEntity<>("Agent", HttpStatus.OK); // Replace with appropriate response
        }
//        } else {
//            return new ResponseEntity<>("User Not Found", HttpStatus.UNAUTHORIZED); // Unauthorized login
//        }
//        if(userService.existsByUsernameAndPassword(loginRequest)){
//            return new ResponseEntity<>("User Found", HttpStatus.OK); // Replace with appropriate response
//        }

        return new ResponseEntity<>("Not Found", HttpStatus.NOT_FOUND);
    }

    // You can add other API endpoints for specific user functionalities
}
