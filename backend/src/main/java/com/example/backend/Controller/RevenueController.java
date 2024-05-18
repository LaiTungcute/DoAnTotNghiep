package com.example.backend.Controller;

import com.example.backend.Response.RevenueResponse;
import com.example.backend.Service.RevenueSummaryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/api/revenue")
public class RevenueController {
    @Autowired
    private RevenueSummaryService revenueSummaryService;

    @GetMapping("")
    public ResponseEntity<?> getRevenue(@RequestParam(required = false) String startDate, @RequestParam(required = false) String endDate) {
        LocalDate start = startDate != null ? LocalDate.parse(startDate) : LocalDate.now().withDayOfMonth(1);
        LocalDate end = endDate != null ? LocalDate.parse(endDate) : LocalDate.now();

        RevenueResponse revenueResponse = revenueSummaryService.calculateRevenueBetweenDates(start, end);

        return ResponseEntity.ok(revenueResponse);
    }
}
