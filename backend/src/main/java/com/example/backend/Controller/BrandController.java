package com.example.backend.Controller;

import com.example.backend.DTO.BrandDTO;
import com.example.backend.Response.BrandResponse;
import com.example.backend.Service.Imp.BrandServiceImp;
import com.example.backend.Service.Imp.FileServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/brand")
public class BrandController {
    @Autowired
    private FileServiceImp fileServiceImp;

    @Autowired
    BrandServiceImp brandServiceImp;

    @PostMapping("/")
    public ResponseEntity<?> insertBrand(@ModelAttribute BrandDTO brand) {
        boolean isInsert = brandServiceImp.isInsert(brand);
        if(isInsert) {
            return new ResponseEntity<>("Insert successfully", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("Insert fail", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/file/{filename:.*}")
    public ResponseEntity<?> getFileBrand(@PathVariable String filename) {
        Resource resource = fileServiceImp.loadFile(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"").body(resource);
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllBrand() {
        List<BrandResponse> brandResponseList = brandServiceImp.getAllBrands();
        return ResponseEntity.ok(brandResponseList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBrandById(@PathVariable int id) {
        BrandResponse brandResponse = brandServiceImp.getBrandById(id);

        return ResponseEntity.ok(brandResponse);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editBrandById(@ModelAttribute BrandDTO brandDTO, @PathVariable int id) {
        boolean isEditBrandById = brandServiceImp.isEditBrandById(brandDTO, id);

        if(isEditBrandById) {
            return ResponseEntity.ok("Edit brand successfully");
        }
        return ResponseEntity.badRequest().body("Edit brand fail");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBrandById(@PathVariable int id) {
        String deleteBrand = brandServiceImp.deleteBrandById(id);

        return ResponseEntity.ok(deleteBrand);
    }
}
