package com.example.backend.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductPageResponse {
    private List<ProductResponse> product;
    private int totalPage;
    private int currentPage;
    private long totalItems;
}
