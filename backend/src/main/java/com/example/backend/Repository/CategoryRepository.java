package com.example.backend.Repository;

import com.example.backend.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findCategoryByCategoryName(String categoryName);
}
