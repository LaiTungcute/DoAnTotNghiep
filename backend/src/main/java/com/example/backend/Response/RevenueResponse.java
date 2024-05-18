package com.example.backend.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RevenueResponse {
    private double totalRevenue;
    private int totalOrderPass;
    private int totalOrderFail;
}
