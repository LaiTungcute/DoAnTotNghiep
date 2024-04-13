package com.example.backend.Service;

import com.example.backend.DTO.LoginDTO;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    String login(LoginDTO loginDto);
}
