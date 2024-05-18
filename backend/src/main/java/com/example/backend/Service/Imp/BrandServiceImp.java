package com.example.backend.Service.Imp;

import com.example.backend.DTO.BrandDTO;
import com.example.backend.Response.BrandResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BrandServiceImp {
    boolean isInsert(BrandDTO brand);

    List<BrandResponse> getAllBrands();

    BrandResponse getBrandById(int id);

    boolean isEditBrandById(BrandDTO brandDTO, int id);

    String deleteBrandById(int id);
}
