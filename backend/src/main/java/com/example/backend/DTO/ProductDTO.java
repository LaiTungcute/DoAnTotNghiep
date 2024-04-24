package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductDTO {
    private String productName;
    private String description;
    private long price;
    private MultipartFile image;
    private int qty;
    private String gender;
    private String categoryName;
    private String brandName;
}
