package com.example.backend.Service;

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
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public Order createOrderFromCart(Long userId, int cartId, String address, String receiver, String phoneNumber) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));

        Order order = new Order();
        order.setUser(user);
        order.setDate(LocalDate.now());
        orderRepository.save(order);

        List<OrderDetail> orderItems = new ArrayList<>();
        long totalAmount = 0;

        for (CartItem cartItem : cart.getCartItems()) {
            OrderDetail orderItem = new OrderDetail();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQty(cartItem.getQty());
            orderItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQty());
            totalAmount += orderItem.getPrice();
            orderItem.setOrder(order);
            orderItems.add(orderItem);
            orderDetailRepository.save(orderItem);
        }

        order.setOrderDetails(orderItems);
        order.setTotalPrice(totalAmount);
        order.setAddress(address);
        order.setReceiver(receiver);
        order.setPhoneNumber(phoneNumber);
        order.setStatus(1);

        // Lưu đơn hàng
        orderRepository.save(order);

        // Xóa giỏ hàng sau khi tạo đơn hàng
        cartRepository.delete(cart);

        return order;
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

    public List<OrderResponse> getAllOrderByUserId(long userId) {
        try {
            List<Order> orderList = orderRepository.findByUserId(userId);
            List<OrderResponse> orderResponseList = new ArrayList<>();

            for (Order order: orderList) {
                OrderResponse orderResponse = mapToResponse(order);

                orderResponseList.add(orderResponse);
            }

            return orderResponseList;
        } catch (Exception e) {
            return null;
        }
    }

    public OrderResponse getAllOrderByOrderId(int orderId) {
        try {
            Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
            OrderResponse orderResponse = mapToResponse(order);

            return orderResponse;
        } catch (Exception e) {
            return null;
        }
    }

    public boolean changeStatus(OrderStatusDTO status, int orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new UsernameNotFoundException("Order not found"));
        if(order == null) return false;
        order.setStatus(status.getStatus());
        orderRepository.save(order);
        return true;
    }

    public List<DailyRevenue> getDailyRevenue(LocalDate startDate, LocalDate endDate) {
        List<Object[]> results = orderRepository.findDailyRevenue(startDate, endDate);
        return results.stream()
                .map(result -> new DailyRevenue((LocalDate) result[0], (long) result[1], (long) result[2]))
                .collect(Collectors.toList());
    }

    public OrderStatusResponse orderStatusResponse() {
        List<Order> orders = orderRepository.findAll();
        int daGiao = 0;
        int dangCho = 0;
        int daNhan = 0;
        int daHuy = 0;
        for (Order order: orders) {
            if (order.getStatus() == 1) dangCho ++;
            if (order.getStatus() == 2) daGiao ++;
            if (order.getStatus() == 3) daNhan ++;
            if (order.getStatus() == 4) daHuy ++;
        }
        OrderStatusResponse orderStatusResponse = new OrderStatusResponse(daGiao, dangCho, daNhan, daHuy);

        return orderStatusResponse;
    }
}

