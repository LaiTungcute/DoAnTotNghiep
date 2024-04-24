package com.example.backend.Service.Imp;

import com.example.backend.DTO.LoginDTO;
import com.example.backend.Response.JWTAuthResponse;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    JWTAuthResponse login(LoginDTO loginDto);
}
