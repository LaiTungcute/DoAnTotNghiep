package com.example.backend.Repository;

import com.example.backend.Entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    Cart findByUserId(long userId);
}
