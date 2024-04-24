package com.example.backend.Repository;

import com.example.backend.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "SELECT p.* FROM product p JOIN brand b ON p.brand_id = b.brand_id "
            + "JOIN category c ON p.category_id = c.category_id "
            + "WHERE (:brandName IS NULL OR b.brand_name = :brandName) "
            + "AND (:categoryName IS NULL OR c.category_name = :categoryName)",
            countQuery = "SELECT COUNT(*) FROM product p JOIN brand b ON p.brand_id = b.brand_id "
                    + "JOIN category c ON p.category_id = c.category_id "
                    + "WHERE (:brandName IS NULL OR b.brand_name = :brandName) "
                    + "AND (:categoryName IS NULL OR c.category_name = :categoryName)",
            nativeQuery = true)
    Page<Product> findProducts(Pageable pageable, @Param("brandName") String brandName, @Param("categoryName") String categoryName);


//    Product findByBrandAndCategoryAndGender(int genderId,int brandId,int categoryId);
}
