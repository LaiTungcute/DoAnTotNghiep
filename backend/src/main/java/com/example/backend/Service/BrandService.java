package com.example.backend.Service;

import com.example.backend.DTO.BrandDTO;
import com.example.backend.Entity.Brand;
import com.example.backend.Repository.BrandRepository;
import com.example.backend.Response.BrandResponse;
import com.example.backend.Service.Imp.BrandServiceImp;
import com.example.backend.Service.Imp.FileServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BrandService implements BrandServiceImp {
    @Autowired
    FileServiceImp fileServiceImp;

    @Autowired
    BrandRepository brandRepository;

    @Override
    public boolean isInsert(BrandDTO brandDTO) {
        boolean isSuccess = fileServiceImp.saveFile(brandDTO.getImage());
        if(isSuccess) {
            Brand brand = new Brand();
            brand.setBrandName(brandDTO.getBrandName());
            brand.setDescription(brandDTO.getDescription());
            brand.setImage(brandDTO.getImage().getOriginalFilename());

            brandRepository.save(brand);

            return true;
        }

        return false;
    }

    @Override
    public List<BrandResponse> getAllBrands(int pageNum, int pageSize) {

        PageRequest pageRequest = PageRequest.of(pageNum, pageSize);
        Page<Brand> listData = brandRepository.findAll(pageRequest);

        List<BrandResponse> brandResponses = new ArrayList<>();

        for (Brand brand: listData) {
            BrandResponse brandResponse = new BrandResponse();
            brandResponse.setBrandId(brand.getId());
            brandResponse.setBrandName(brand.getBrandName());
            brandResponse.setDescription(brand.getDescription());
            brandResponse.setImage(brand.getImage());

            brandResponses.add(brandResponse);
        }

        return brandResponses;
    }

    @Override
    public BrandResponse getBrandById(int id) {
        Brand brand = brandRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Brand with "+ id + " is not exist"));

        BrandResponse brandResponse = new BrandResponse();

        brandResponse.setBrandId(brand.getId());
        brandResponse.setBrandName(brand.getBrandName());
        brandResponse.setDescription(brand.getDescription());
        brandResponse.setImage(brand.getImage());

        return brandResponse;
    }

    @Override
    public boolean isEditBrandById(BrandDTO brandDTO, int id) {
        Brand brand = brandRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User with "+ id + " is not exist"));

        boolean isSuccess = fileServiceImp.saveFile(brandDTO.getImage());
        if(isSuccess) {
            brand.setBrandName(brandDTO.getBrandName());
            brand.setDescription(brandDTO.getDescription());
            brand.setImage(brandDTO.getImage().getOriginalFilename());

            brandRepository.save(brand);

            return true;
        }

        return false;
    }

    @Override
    public String deleteBrandById(int id) {
        Brand brand = brandRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User with "+ id + " is not exist"));

        brandRepository.delete(brand);

        return "Delete successfully";
    }
}
