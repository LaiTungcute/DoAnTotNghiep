package com.example.backend.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatusResponse {
    private int daGiao;
    private int dangCho;
    private int daNhan;
    private int daHuy;
}
