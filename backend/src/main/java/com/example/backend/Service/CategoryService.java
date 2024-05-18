package com.example.backend.Service;

import com.example.backend.DTO.CategoryDTO;
import com.example.backend.Entity.Category;
import com.example.backend.Repository.CategoryRepository;
import com.example.backend.Response.CategoryResponse;
import com.example.backend.Service.Imp.CategoryServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CategoryService implements CategoryServiceImp {
    @Autowired
    CategoryRepository categoryRepository;


    @Override
    public boolean isInsert(CategoryDTO category) {
        Category category1 = new Category();
        category1.setCategoryName(category.getCategoryName());

        Date date = new Date();
        category1.setCreatedDate(date);

        categoryRepository.save(category1);

        return true;
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryResponse> categoryResponses = new ArrayList<>();
        for (Category category : categories) {
            CategoryResponse categoryResponse = new CategoryResponse(category.getId(), category.getCategoryName());

            categoryResponses.add(categoryResponse);
        }

        return categoryResponses;
    }

    @Override
    public CategoryResponse getCategoryById(int id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Category with "+ id + " is not exist"));

        CategoryResponse categoryResponse = new CategoryResponse(category.getId(), category.getCategoryName());

        return categoryResponse;
    }

    @Override
    public boolean isEditCategoryById(CategoryDTO categoryDTO, int id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Category with "+ id + " is not exist"));
        category.setCategoryName(categoryDTO.getCategoryName());

        return true;
    }

    @Override
    public String deleteCategoryById(int id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User with "+ id + " is not exist"));

        categoryRepository.delete(category);

        return "Delete successfully";
    }
}
