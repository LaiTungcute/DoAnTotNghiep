package com.example.backend.Service;

import com.example.backend.DTO.CartDTO;
import com.example.backend.DTO.OrderDTO;
import com.example.backend.DTO.OrderStatusDTO;
import com.example.backend.Entity.*;
import com.example.backend.Repository.*;
import com.example.backend.Response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public CartResponse getAllCartByUserId(long userId) {
        try {
            Cart cart = cartRepository.findByUserId(userId);

            List<CartItemResponse> cartItemResponses = new ArrayList<>();
            CartResponse cartResponse = new CartResponse();
            List<CartItem> cartItems = cart.getCartItems();

            for (CartItem cartItem: cartItems) {
                CartItemResponse cartItemResponse = mapToItemResponse(cartItem);

                cartItemResponses.add(cartItemResponse);
            }

            cartResponse.setUserId(Math.toIntExact(cart.getUser().getId()));
            cartResponse.setId(cart.getId());
            cartResponse.setCartItemResponses(cartItemResponses);
            cartResponse.setTotalPrice(cart.getTotalPrice());
            cartResponse.setUsername(cart.getUser().getUsername());

            return cartResponse;
        } catch (Exception e) {
            return null;
        }
    }

    private CartItemResponse mapToItemResponse(CartItem cartItem) {
        CartItemResponse cartItemResponse = new CartItemResponse();

        cartItemResponse.setId(cartItem.getId());
        cartItemResponse.setImage(cartItem.getProduct().getImage());
        cartItemResponse.setProductId(cartItem.getProduct().getId());
        cartItemResponse.setProductName(cartItem.getProduct().getProductName());
        cartItemResponse.setQty(cartItem.getQty());
        cartItemResponse.setPrice(cartItem.getPrice());

        return cartItemResponse;
    }

    public boolean addCart(CartDTO cartDTO) {
        Cart cart = cartRepository.findByUserId(cartDTO.getUserId());

        User user = userRepository.findById(cartDTO.getUserId()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Product product = productRepository.findById(cartDTO.getProductId()).orElseThrow(() -> new UsernameNotFoundException("Product not found"));

        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
        }

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        Optional<CartItem> existingItem = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId() == cartDTO.getProductId())
                .findFirst();

        if (existingItem.isPresent()) {
            // Nếu đã tồn tại, cập nhật số lượng sản phẩm
            CartItem item = existingItem.get();
            item.setQty(item.getQty() + cartDTO.getQuantity());
            cartItemRepository.save(item);
        } else {
            // Nếu chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
            CartItem newItem = new CartItem();
            newItem.setProduct(product);
            newItem.setQty(cartDTO.getQuantity());
            newItem.setPrice(product.getPrice());
            newItem.setCart(cart);

            List<CartItem> cartItems = cart.getCartItems();

            cartItems.add(newItem);

            int qty = product.getQty() - cartDTO.getQuantity();
            product.setQty(qty);
            productRepository.save(product);

            cartItemRepository.save(newItem);
        }

        LocalDate date = LocalDate.now();
        cart.setDate(date);

        cart.setTotalPrice(totalPrice(cartDTO.getUserId()));
        // Cập nhật giỏ hàng
        cartRepository.save(cart);
        return true;
    }

    private long totalPrice(long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            return 0;
        }
        return cart.getCartItems().stream()
                .mapToLong(item -> item.getQty() * item.getPrice())
                .sum();
    }

    public boolean deleteCart(int userId, int cartItemId) {
        Cart cart = cartRepository.findByUserId(userId);

        cartRepository.deleteById(cartItemId);

        updateTotalPrice(cart);

        return true;
    }

    private void updateTotalPrice(Cart cart) {
        // Lấy danh sách cart item còn lại trong giỏ hàng
        List<CartItem> cartItems = cart.getCartItems();

        // Tính tổng giá mới của giỏ hàng
        long totalPrice = 0;
        for (CartItem item : cartItems) {
            totalPrice += item.getPrice() * item.getQty();
        }

        // Cập nhật totalPrice trong giỏ hàng
        cart.setTotalPrice(totalPrice);

        // Lưu cập nhật vào cơ sở dữ liệu
        cartRepository.save(cart);
    }
}
