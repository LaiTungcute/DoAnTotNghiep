package com.example.backend.Controller;

import com.example.backend.DTO.OrderDTO;
import com.example.backend.DTO.OrderStatusDTO;
import com.example.backend.Entity.Order;
import com.example.backend.Response.OrderPageResponse;
import com.example.backend.Response.OrderResponse;
import com.example.backend.Service.OrderService;
import jdk.dynalink.linker.LinkerServices;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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



    @PostMapping("/changestatus/{orderId}")
    public ResponseEntity<?> changeStatus(@RequestBody OrderStatusDTO status, @PathVariable(name = "orderId") int orderId) {
        boolean isChange = orderService.changeStatus(status, orderId);
        if(isChange)
            return ResponseEntity.ok("Change successfully");
        return ResponseEntity.badRequest().body("Error");
    }
}
