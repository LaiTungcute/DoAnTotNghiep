package com.example.backend.Controller;

import com.example.backend.DTO.CartDTO;
import com.example.backend.DTO.OrderDTO;
import com.example.backend.DTO.OrderStatusDTO;
import com.example.backend.Response.CartResponse;
import com.example.backend.Response.OrderPageResponse;
import com.example.backend.Response.OrderResponse;
import com.example.backend.Service.CartService;
import com.example.backend.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getAllCartByUserId(@PathVariable(name = "userId") long userId) {
        CartResponse cartResponse = cartService.getAllCartByUserId(userId);
        return ResponseEntity.ok(cartResponse);
    }

    @PostMapping("/create")
    public ResponseEntity<?> addCart(@RequestBody CartDTO cartDTO) {
        boolean cart = cartService.addCart(cartDTO);
        if(cart)
            return ResponseEntity.ok("Create successfully");
        return ResponseEntity.badRequest().body("Error");
    }

    @DeleteMapping("/delete/{userId}/{cartItemId}")
    public ResponseEntity<?> deleteCart(@PathVariable(name = "userId") int userId, @PathVariable(name = "cartItemId") int cartItemId) {
        boolean isDetele = cartService.deleteCart(userId, cartItemId);
        if(isDetele)
            return ResponseEntity.ok("Delete successfully");
        return ResponseEntity.badRequest().body("Error");
    }
}
