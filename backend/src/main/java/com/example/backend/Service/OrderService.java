package com.example.backend.Service;

import com.example.backend.DTO.OrderDTO;
import com.example.backend.DTO.OrderStatusDTO;
import com.example.backend.Entity.*;
import com.example.backend.Repository.*;
import com.example.backend.Response.OrderDetailResponse;
import com.example.backend.Response.OrderPageResponse;
import com.example.backend.Response.OrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    public Order createOrderFromCart(Long userId, int cartId, String address, String receiver, String phoneNumber) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));

        Order order = new Order();
        order.setUser(user);
        order.setDate(LocalDate.now());

        List<OrderDetail> orderItems = new ArrayList<>();
        long totalAmount = 0;

        for (CartItem cartItem : cart.getCartItems()) {
            OrderDetail orderItem = new OrderDetail();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQty(cartItem.getQty());
            orderItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQty());
            totalAmount += orderItem.getPrice();
            orderItems.add(orderItem);
        }

        order.setOrderDetails(orderItems);
        order.setTotalPrice(totalAmount);
        order.setAddress(address);
        order.setReceiver(receiver);
        order.setPhoneNumber(phoneNumber);

        // Lưu đơn hàng
        Order savedOrder = orderRepository.save(order);

        // Xóa giỏ hàng sau khi tạo đơn hàng
        cartRepository.delete(cart);

        return savedOrder;
    }

    private OrderDetailResponse mapToDetailResponse(OrderDetail orderDetail) {
        OrderDetailResponse orderDetailResponse = new OrderDetailResponse();

        orderDetailResponse.setId(orderDetail.getId());
        orderDetailResponse.setImage(orderDetail.getProduct().getImage());
        orderDetailResponse.setProductId(orderDetail.getProduct().getId());
        orderDetailResponse.setProductName(orderDetail.getProduct().getProductName());
        orderDetailResponse.setQty(orderDetail.getQty());
        orderDetailResponse.setPrice(orderDetail.getPrice());

        return orderDetailResponse;
    }

    private OrderResponse mapToResponse(Order order) {
        OrderResponse orderResponse = new OrderResponse();

        orderResponse.setId(order.getId());
        orderResponse.setUserId(Math.toIntExact(order.getUser().getId()));
        List<OrderDetail> orderDetails = order.getOrderDetails();
        List<OrderDetailResponse> orderDetailResponses = new ArrayList<>();

        orderResponse.setTotalPrice(order.getTotalPrice());

        for (OrderDetail orderDetail: orderDetails) {
            OrderDetailResponse orderDetailResponse = mapToDetailResponse(orderDetail);

            orderDetailResponses.add(orderDetailResponse);
        }
        orderResponse.setStatus(order.getStatus());
        orderResponse.setUsername(order.getUser().getUsername());
        orderResponse.setAddress(order.getAddress());

        orderResponse.setOrderDetailResponses(orderDetailResponses);
        return orderResponse;
    }

    public OrderPageResponse getAllOrder(int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        Page<Order> listData = orderRepository.findAll(pageable);

        int totalPages = listData.getTotalPages();
        long totalItems = listData.getTotalElements();

        OrderPageResponse orderPageResponse = new OrderPageResponse();

        List<OrderResponse> orders = new ArrayList<>();

        for (Order order: listData) {
            OrderResponse orderResponse = mapToResponse(order);

            orders.add(orderResponse);
        }

        orderPageResponse.setOrder(orders);

        orderPageResponse.setCurrentPage(pageNum);
        orderPageResponse.setTotalItems(totalItems);
        orderPageResponse.setTotalPages(totalPages);

        return orderPageResponse;
    }

    public boolean changeStatus(OrderStatusDTO status, int orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new UsernameNotFoundException("Order not found"));
        if(order == null) return false;
        order.setStatus(status.getStatus());
        orderRepository.save(order);
        return true;
    }
}
