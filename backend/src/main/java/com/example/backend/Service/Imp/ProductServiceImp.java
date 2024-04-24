package com.example.backend.Service.Imp;

import com.example.backend.DTO.ProductDTO;
import com.example.backend.Response.ProductPageResponse;
import com.example.backend.Response.ProductResponse;
import org.springframework.stereotype.Service;

@Service
public interface ProductServiceImp {
    boolean isInsert(ProductDTO productDTO);

    ProductPageResponse getAllProducts(int pageNum, int pageSize, String brandName, String categoryName);

    ProductResponse getProductById(int id);

    boolean isEditProductById(ProductDTO brandDTO, int id);

    String deleteProductdById(int id);
}
