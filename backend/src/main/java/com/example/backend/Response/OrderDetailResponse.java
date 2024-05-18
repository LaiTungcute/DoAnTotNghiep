package com.example.backend.Response;

import com.example.backend.Entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailResponse {
    private int id;
    private int qty;
    private long price;
    private int productId;
    private String productName;
    private String image;
}
