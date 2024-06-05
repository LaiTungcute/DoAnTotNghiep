package com.example.backend.Repository;

import com.example.backend.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserId(long userId);

    List<Order> findAllByDateBetween(LocalDate startDate, LocalDate endDate);

    @Query("SELECT o.date AS date, COUNT(o) AS orderCount, SUM(i.price * i.qty) AS totalRevenue " +
            "FROM Order o JOIN o.orderDetails i " +
            "where o.date BETWEEN :startDate AND :endDate " +
            "GROUP BY o.date " +
            "ORDER BY o.date")
    List<Object[]> findDailyRevenue(LocalDate startDate, LocalDate endDate);


//    void deleteByOrderDetailId(int orderDetailId);

//    void deleteByOrderDetailIdAndUserId(int orderDetailId, int userId);
}
