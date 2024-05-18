package com.example.backend.Service;

import com.example.backend.DTO.ProductDTO;
import com.example.backend.Entity.Brand;
import com.example.backend.Entity.Category;
import com.example.backend.Entity.Gender;
import com.example.backend.Entity.Product;
import com.example.backend.Repository.BrandRepository;
import com.example.backend.Repository.GenderRepository;
import com.example.backend.Repository.ProductRepository;
import com.example.backend.Repository.CategoryRepository;
import com.example.backend.Response.ProductPageResponse;
import com.example.backend.Response.ProductResponse;
import com.example.backend.Service.Imp.FileServiceImp;
import com.example.backend.Service.Imp.ProductServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService implements ProductServiceImp {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private GenderRepository genderRepository;

    @Autowired
    FileServiceImp fileServiceImp;

    @Autowired
    private BrandRepository brandRepository;
    @Override
    public boolean isInsert(ProductDTO productDTO) {
        boolean isSuccess = fileServiceImp.saveFile(productDTO.getImage());
        if(isSuccess) {
            Product product = new Product();
            product.setProductName(productDTO.getProductName());
            product.setDescription(productDTO.getDescription());
            product.setImage(productDTO.getImage().getOriginalFilename());

            Gender gender = genderRepository.findGenderByGenderName(productDTO.getGender()).orElseThrow(() -> new UsernameNotFoundException("Gender with "+ productDTO.getGender() + " is not exist"));
            Brand brand = brandRepository.findBrandByBrandName(productDTO.getBrandName()).orElseThrow(() -> new UsernameNotFoundException("Brand with "+ productDTO.getBrandName() + " is not exist"));
            Category category = categoryRepository.findCategoryByCategoryName(productDTO.getCategoryName()).orElseThrow(() -> new UsernameNotFoundException("Category with "+ productDTO.getCategoryName() + " is not exist"));

            product.setPrice(productDTO.getPrice());
            product.setQty(productDTO.getQty());

            product.setGender(gender);
            product.setBrand(brand);
            product.setCategory(category);

            productRepository.save(product);

            return true;
        }

        return false;
    }

    @Override
    public ProductPageResponse getAllProducts(int pageNum, int pageSize, String brandName, String categoryName) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        Page<Product> listData = productRepository.findProducts(pageable, brandName, categoryName);

        int totalPages = listData.getTotalPages();
        long totalItems = listData.getTotalElements();

        List<ProductResponse> productResponses = new ArrayList<>();

        for (Product product: listData) {
            ProductResponse productResponse = getResponse(product);

            productResponses.add(productResponse);
        }

        ProductPageResponse productPageResponse = new ProductPageResponse();
        productPageResponse.setProduct(productResponses);
        productPageResponse.setCurrentPage(pageNum);
        productPageResponse.setTotalPage(totalPages);
        productPageResponse.setTotalItems(totalItems);

        return productPageResponse;
    }

    private static ProductResponse getResponse(Product product) {
        ProductResponse productResponse = new ProductResponse();

        productResponse.setProductId(product.getId());
        productResponse.setProductName(product.getProductName());
        productResponse.setGender(product.getGender().getGenderName());
        productResponse.setQty(product.getQty());
        productResponse.setPrice(product.getPrice());
        productResponse.setBrandName(product.getBrand().getBrandName());
        productResponse.setCategoryName(product.getCategory().getCategoryName());
        productResponse.setDescription(product.getDescription());
        productResponse.setImage(product.getImage());
        return productResponse;
    }

    @Override
    public ProductResponse getProductById(int id) {
        Product product = productRepository.findById(id).orElseThrow(() ->new IllegalArgumentException("Product not found"));

        ProductResponse productResponse = new ProductResponse();

        productResponse.setProductId(product.getId());
        productResponse.setProductName(product.getProductName());
        productResponse.setPrice(product.getPrice());
        productResponse.setGender(product.getGender().getGenderName());
        productResponse.setDescription(product.getDescription());
        productResponse.setCategoryName(product.getCategory().getCategoryName());
        productResponse.setImage(product.getImage());
        productResponse.setQty(product.getQty());
        productResponse.setBrandName(product.getBrand().getBrandName());

        return productResponse;
    }

    @Override
    public boolean isEditProductById(ProductDTO productDTO, int id) {
        Product product = productRepository.findById(id).orElseThrow(() ->new IllegalArgumentException("Product not found"));

        boolean isSuccess = fileServiceImp.saveFile(productDTO.getImage());
        if(isSuccess) {
            product.setProductName(productDTO.getBrandName());
            product.setDescription(productDTO.getDescription());
            product.setImage(productDTO.getImage().getOriginalFilename());

            Gender gender = genderRepository.findGenderByGenderName(productDTO.getGender()).orElseThrow(() -> new UsernameNotFoundException("Gender with "+ productDTO.getGender() + " is not exist"));
            Brand brand = brandRepository.findBrandByBrandName(productDTO.getBrandName()).orElseThrow(() -> new UsernameNotFoundException("Brand with "+ productDTO.getBrandName() + " is not exist"));
            Category category = categoryRepository.findCategoryByCategoryName(productDTO.getCategoryName()).orElseThrow(() -> new UsernameNotFoundException("Category with "+ productDTO.getCategoryName() + " is not exist"));

            product.setPrice(productDTO.getPrice());
            product.setQty(productDTO.getQty());

            product.setGender(gender);
            product.setBrand(brand);
            product.setCategory(category);

            productRepository.save(product);

            return true;
        }

        return false;
    }

    @Override
    public String deleteProductdById(int id) {
        productRepository.deleteById(id);
        return "Delete successfully";
    }
}
