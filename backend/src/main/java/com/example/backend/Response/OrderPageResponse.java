package com.example.backend.Response;

import com.example.backend.Entity.Order;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderPageResponse {
    private List<OrderResponse> order;
    private int totalPages;
    private long totalItems;
    private int currentPage;
}
