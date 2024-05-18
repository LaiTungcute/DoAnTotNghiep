package com.example.backend.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderResponse {
    private int id;
    private int userId;
    private List<OrderDetailResponse> orderDetailResponses;
    private long totalPrice;
    private int status;
    private String username;
}
