package com.example.backend.Service.Imp;

import com.example.backend.DTO.BrandDTO;
import com.example.backend.DTO.CategoryDTO;
import com.example.backend.Response.BrandResponse;
import com.example.backend.Response.CategoryResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryServiceImp {
    boolean isInsert(CategoryDTO category);

    List<CategoryResponse> getAllCategories();

    CategoryResponse getCategoryById(int id);

    boolean isEditCategoryById(CategoryDTO categoryDTO, int id);

    String deleteCategoryById(int id);
}
