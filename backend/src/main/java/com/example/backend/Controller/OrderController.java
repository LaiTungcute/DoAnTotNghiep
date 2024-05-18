package com.example.backend.Controller;

import com.example.backend.DTO.OrderDTO;
import com.example.backend.DTO.OrderStatusDTO;
import com.example.backend.Entity.Order;
import com.example.backend.Response.OrderPageResponse;
import com.example.backend.Response.OrderResponse;
import com.example.backend.Service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getAllOrderByUserId(@PathVariable(name = "userId") long userId) {
        OrderResponse order = orderService.getAllOrderByUserId(userId);
        return ResponseEntity.ok(order);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllOrder(@RequestParam(value = "currentPage", defaultValue = "0") int pageNum,
                                         @RequestParam(value = "pageSize", defaultValue = "6") int pageSize) {
        OrderPageResponse orderPageResponse = orderService.getAllOrder(pageNum, pageSize);
        return ResponseEntity.ok(orderPageResponse);
    }

    @PostMapping("/create")
    public ResponseEntity<?> addOrder(@RequestBody OrderDTO orderDTO) {
        boolean order = orderService.addOrder(orderDTO);
        if(order)
            return ResponseEntity.ok("Create successfully");
        return ResponseEntity.badRequest().body("Error");
    }

    @PostMapping("/changestatus/{orderId}")
    public ResponseEntity<?> changeStatus(@RequestBody OrderStatusDTO status, @PathVariable(name = "orderId") int orderId) {
        boolean isChange = orderService.changeStatus(status, orderId);
        if(isChange)
            return ResponseEntity.ok("Change successfully");
        return ResponseEntity.badRequest().body("Error");
    }

    @DeleteMapping("/delete/{userId}/{orderDetailId}")
    public ResponseEntity<?> deleteOrder(@PathVariable(name = "userId") int userId, @PathVariable(name = "orderDetailId") int orderDetailId) {
        boolean isDetele = orderService.deleteOrderDetail(userId, orderDetailId);
        if(isDetele)
            return ResponseEntity.ok("Delete successfully");
        return ResponseEntity.badRequest().body("Error");
    }
}
