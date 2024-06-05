package com.example.backend.Controller;

import com.example.backend.DTO.OrderDTO;
import com.example.backend.DTO.OrderStatusDTO;
import com.example.backend.Entity.Order;
import com.example.backend.Response.DailyRevenue;
import com.example.backend.Response.OrderPageResponse;
import com.example.backend.Response.OrderResponse;
import com.example.backend.Response.OrderStatusResponse;
import com.example.backend.Service.OrderService;
import jdk.dynalink.linker.LinkerServices;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @GetMapping("")
    public ResponseEntity<?> getAllOrder(@RequestParam(value = "currentPage", defaultValue = "0") int pageNum,
                                         @RequestParam(value = "pageSize", defaultValue = "6") int pageSize) {
        OrderPageResponse orderPageResponse = orderService.getAllOrder(pageNum, pageSize);
        return ResponseEntity.ok(orderPageResponse);
    }

    @GetMapping("/getOrder/{userId}")
    public ResponseEntity<?> getAllOrderbyUserId(@PathVariable(name = "userId") long userId) {
        List<OrderResponse> orderResponseList = orderService.getAllOrderByUserId(userId);
        return ResponseEntity.ok(orderResponseList);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getAllOrderByOrderId(@PathVariable(name = "orderId") int orderId) {
        OrderResponse orderResponse = orderService.getAllOrderByOrderId(orderId);
        return ResponseEntity.ok(orderResponse);
    }

    @PostMapping("/changestatus/{orderId}")
    public ResponseEntity<?> changeStatus(@RequestBody OrderStatusDTO status, @PathVariable(name = "orderId") int orderId) {
        boolean isChange = orderService.changeStatus(status, orderId);
        if(isChange)
            return ResponseEntity.ok("Change successfully");
        return ResponseEntity.badRequest().body("Error");
    }

    @GetMapping("/revenue/daily")
    @PreAuthorize("hasRole('ADMIN')")
    public List<DailyRevenue> getDailyRevenue(@RequestParam(value = "startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate, @RequestParam(value = "endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return orderService.getDailyRevenue(startDate, endDate);
    }

    @GetMapping("/revenue/orderStatus")
    public OrderStatusResponse getRevenueStatus() {
        return orderService.orderStatusResponse();
    }
}
