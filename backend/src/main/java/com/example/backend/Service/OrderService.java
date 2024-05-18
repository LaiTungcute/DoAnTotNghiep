package com.example.backend.Service;

import com.example.backend.DTO.OrderDTO;
import com.example.backend.DTO.OrderStatusDTO;
import com.example.backend.Entity.*;
import com.example.backend.Repository.OrderDetailRepository;
import com.example.backend.Repository.OrderRepository;
import com.example.backend.Repository.ProductRepository;
import com.example.backend.Repository.UserRepository;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public OrderResponse getAllOrderByUserId(long userId) {
       try {
           Order order = orderRepository.findByUserId(userId);
           OrderResponse orderResponse = new OrderResponse();

           List<OrderDetailResponse> orderDetailResponses = new ArrayList<>();

           List<OrderDetail> orderDetails = order.getOrderDetails();

           for (OrderDetail orderDetail: orderDetails) {
               OrderDetailResponse orderDetailResponse = mapToDetailResponse(orderDetail);

               orderDetailResponses.add(orderDetailResponse);
           }

           orderResponse.setUserId(Math.toIntExact(order.getUser().getId()));
           orderResponse.setId(order.getId());
           orderResponse.setOrderDetailResponses(orderDetailResponses);
           orderResponse.setTotalPrice(order.getTotalPrice());

           return orderResponse;
       } catch (Exception e) {
           return null;
       }
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

    public boolean addOrder(OrderDTO orderDTO) {
        Order order = orderRepository.findByUserId(orderDTO.getUserId());

        User user = userRepository.findById(orderDTO.getUserId()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Product product = productRepository.findById(orderDTO.getProductId()).orElseThrow(() -> new UsernameNotFoundException("Product not found"));


        if (order == null) {
            order = new Order();
            order.setUser(user);
            order.setStatus(1);
            orderRepository.save(order);
        }

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        Optional<OrderDetail> existingItem = order.getOrderDetails().stream()
                .filter(item -> item.getProduct().getId() == orderDTO.getProductId())
                .findFirst();

        if (existingItem.isPresent()) {
            // Nếu đã tồn tại, cập nhật số lượng sản phẩm
            OrderDetail item = existingItem.get();
            item.setQty(item.getQty() + orderDTO.getQuantity());
            orderDetailRepository.save(item);
        } else {
            // Nếu chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
            OrderDetail newItem = new OrderDetail();
            newItem.setProduct(product);
            newItem.setQty(orderDTO.getQuantity());
            newItem.setPrice(product.getPrice());
            newItem.setOrder(order);

            List<OrderDetail> orderDetails = order.getOrderDetails();

            orderDetails.add(newItem);

            orderDetailRepository.save(newItem);
        }

        LocalDate date = LocalDate.now();
        order.setDate(date);

        order.setTotalPrice(totalPrice(orderDTO.getUserId()));
        // Cập nhật giỏ hàng
        orderRepository.save(order);
        return true;
    }

    private long totalPrice(long userId) {
        Order order = orderRepository.findByUserId(userId);
        if (order == null) {
            return 0;
        }
        return order.getOrderDetails().stream()
                .mapToLong(item -> item.getQty() * item.getPrice())
                .sum();
    }

    public boolean changeStatus(OrderStatusDTO status, int orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new UsernameNotFoundException("Order not found"));
        if(order == null) return false;
        order.setStatus(status.getStatus());
        orderRepository.save(order);
        return true;
    }

    public boolean deleteOrderDetail(int userId, int orderDetailId) {
        Order order = orderRepository.findByUserId(userId);

        orderDetailRepository.deleteById(orderDetailId);

        updateTotalPrice(order);

        return true;
    }

    private void updateTotalPrice(Order order) {
        // Lấy danh sách cart item còn lại trong giỏ hàng
        List<OrderDetail> cartItems = order.getOrderDetails();

        // Tính tổng giá mới của giỏ hàng
        long totalPrice = 0;
        for (OrderDetail item : cartItems) {
            totalPrice += item.getPrice() * item.getQty();
        }

        // Cập nhật totalPrice trong giỏ hàng
        order.setTotalPrice(totalPrice);

        // Lưu cập nhật vào cơ sở dữ liệu
        orderRepository.save(order);
    }
}
