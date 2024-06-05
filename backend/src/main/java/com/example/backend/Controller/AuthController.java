package com.example.backend.Controller;

import com.example.backend.Config.Jwt.JwtTokenProvider;
import com.example.backend.DTO.LoginDTO;
import com.example.backend.DTO.RegisterDTO;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Response.JWTAuthResponse;
import com.example.backend.Service.Imp.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    JwtTokenProvider jwtUtils;

    // Build Login REST API
    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginDTO loginDto){
            JWTAuthResponse jwtAuthResponse = authService.login(loginDto);
            if (jwtAuthResponse == null) {
                return ResponseEntity.badRequest().body("Username or password is not true");
            }
            return ResponseEntity.ok(jwtAuthResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterDTO signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()), signUpRequest.getPhoneNumber());

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName("ROLE_USER")
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "saler":
                        Role saleRole = roleRepository.findByName("ROLE_SALESMAN")
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(saleRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName("ROLE_USER")
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        user.setCreatedDate(new Date());
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}
