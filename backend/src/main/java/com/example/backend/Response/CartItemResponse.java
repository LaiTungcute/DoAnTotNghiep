package com.example.backend.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartItemResponse {
    private int id;
    private int qty;
    private long price;
    private int productId;
    private String productName;
    private String image;
}
