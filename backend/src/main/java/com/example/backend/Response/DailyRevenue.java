package com.example.backend.Response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class DailyRevenue {
    private LocalDate date;
    private long orderCount;
    private long totalRevenue;

    public DailyRevenue(LocalDate date, long orderCount, long totalRevenue) {
        this.date = date;
        this.orderCount = orderCount;
        this.totalRevenue = totalRevenue;
    }
}