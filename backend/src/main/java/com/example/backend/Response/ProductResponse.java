package com.example.backend.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private String productName;
    private String description;
    private long price;
    private String image;
    private int qty;
    private String gender;
    private String categoryName;
    private String brandName;
}
