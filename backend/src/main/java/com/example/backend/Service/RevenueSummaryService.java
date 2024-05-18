package com.example.backend.Service;

import com.example.backend.DTO.RevenueDTO;
import com.example.backend.Entity.Order;
import com.example.backend.Entity.OrderDetail;
import com.example.backend.Entity.RevenueSummary;
import com.example.backend.Repository.OrderDetailRepository;
import com.example.backend.Repository.OrderRepository;
import com.example.backend.Repository.RevenueSummaryRepository;
import com.example.backend.Response.OrderResponse;
import com.example.backend.Response.RevenueResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RevenueSummaryService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RevenueSummaryRepository revenueSummaryRepository;

    public RevenueResponse calculateRevenueBetweenDates(LocalDate startDate, LocalDate endDate) {
        List<Order> orders = orderRepository.findAllByDateBetween(startDate, endDate);
        double totalRevenue = 0.0;
        int totalOrderPass = 0;
        int totalOrderFail = 0;

        for (Order order : orders) {
            if(order.getStatus() == 2) {
                for (OrderDetail orderItem : order.getOrderDetails()) {
                    totalRevenue += orderItem.getPrice() * orderItem.getQty();
                }
                totalOrderPass = totalOrderPass + 1;
            }

            if(order.getStatus() != 2) {
                totalOrderFail = totalOrderFail + 1;
            }
        }

        RevenueResponse revenueResponse = new RevenueResponse();

        revenueResponse.setTotalRevenue(totalRevenue);
        revenueResponse.setTotalOrderPass(totalOrderPass);
        revenueResponse.setTotalOrderFail(totalOrderFail);

        // Tạo đối tượng RevenueSummary và lưu vào cơ sở dữ liệu
        RevenueSummary revenueSummary = new RevenueSummary(startDate, endDate, totalRevenue, totalOrderPass, totalOrderFail);
        revenueSummaryRepository.save(revenueSummary);

        return revenueResponse;
    }
}
