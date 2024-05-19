package com.example.backend.Response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CartResponse {
    private int id;
    private int userId;
    private List<CartItemResponse> cartItemResponses;
    private long totalPrice;
    private int status;
    private String username;
}
