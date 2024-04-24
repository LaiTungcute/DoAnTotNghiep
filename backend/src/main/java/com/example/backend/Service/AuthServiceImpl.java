package com.example.backend.Service;

import com.example.backend.Config.Jwt.JwtTokenProvider;
import com.example.backend.DTO.LoginDTO;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Response.JWTAuthResponse;
import com.example.backend.Response.UserResponse;
import com.example.backend.Service.Imp.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;


    public AuthServiceImpl(
            JwtTokenProvider jwtTokenProvider,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public JWTAuthResponse login(LoginDTO loginDto) {
        JWTAuthResponse response = new JWTAuthResponse();
           Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                   loginDto.getUsername(), loginDto.getPassword()));
           SecurityContextHolder.getContext().setAuthentication(authentication);

           String token = jwtTokenProvider.generateToken(authentication);

           UserDetailImp userDetails = (UserDetailImp) authentication.getPrincipal();

           List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());

           long userId = userDetails.getId();
           String username = userDetails.getUsername();
           String email = userDetails.getEmail();
           String phoneNumber = userDetails.getPhoneNumber();

        UserResponse userResponse = new UserResponse(userId, username, email, phoneNumber, roles);

           response.setAccessToken(token);
           response.setUser(userResponse);

        return response;
    }
}