package com.example.backend.Controller;

import com.example.backend.DTO.BrandDTO;
import com.example.backend.DTO.CategoryDTO;
import com.example.backend.Entity.Category;
import com.example.backend.Response.BrandResponse;
import com.example.backend.Response.CategoryResponse;
import com.example.backend.Service.Imp.BrandServiceImp;
import com.example.backend.Service.Imp.CategoryServiceImp;
import com.example.backend.Service.Imp.FileServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    CategoryServiceImp categoryServiceImp;

    @PostMapping("/")
    public ResponseEntity<?> insertCategory(@RequestBody CategoryDTO categoryDTO) {
        boolean isInsert = categoryServiceImp.isInsert(categoryDTO);
        if(isInsert) {
            return new ResponseEntity<>("Insert successfully", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("Insert fail", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllCategories() {
        List<CategoryResponse> brandResponseList = categoryServiceImp.getAllCategories();
        return ResponseEntity.ok(brandResponseList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable int id) {
        CategoryResponse categoryResponse = categoryServiceImp.getCategoryById(id);

        return ResponseEntity.ok(categoryResponse);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editCategoryById(@RequestBody CategoryDTO categoryDTO, @PathVariable int id) {
        boolean isEditCategoryById = categoryServiceImp.isEditCategoryById(categoryDTO, id);

        if(isEditCategoryById) {
            return ResponseEntity.ok("Edit category successfully");
        }
        return ResponseEntity.badRequest().body("Edit category fail");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategoryById(@PathVariable int id) {
        String deleteCategory = categoryServiceImp.deleteCategoryById(id);

        return ResponseEntity.ok(deleteCategory);
    }
}
