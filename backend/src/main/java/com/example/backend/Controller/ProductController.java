package com.example.backend.Controller;

import com.example.backend.DTO.ProductDTO;
import com.example.backend.Response.ProductPageResponse;
import com.example.backend.Response.ProductResponse;
import com.example.backend.Service.Imp.FileServiceImp;
import com.example.backend.Service.Imp.ProductServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    private FileServiceImp fileServiceImp;

    @Autowired
    private ProductServiceImp productServiceImp;

    @PostMapping("/")
    public ResponseEntity<?> insertProduct(@ModelAttribute ProductDTO productDTO) {
        boolean isInsert = productServiceImp.isInsert(productDTO);
        if(isInsert) {
            return new ResponseEntity<>("Insert successfully", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("Insert fail", HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/file/{filename:.*}")
    public ResponseEntity<?> getFileProduct(@PathVariable String filename) {
        Resource resource = fileServiceImp.loadFile(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"").body(resource);
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllProduct(@RequestParam(value = "currentPage", defaultValue = "0") int pageNum,
                                           @RequestParam(value = "pageSize", defaultValue = "6") int pageSize,
                                           @RequestParam(value = "brandName", required = false) String brandName,
                                           @RequestParam(value = "categoryName", required = false) String categoryName,
                                           @RequestParam(value = "productName", required = false) String productName) {
        ProductPageResponse productPageResponse = productServiceImp.getAllProducts(pageNum, pageSize, brandName, categoryName, productName);
        return ResponseEntity.ok(productPageResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") int id) {
        ProductResponse productResponse = productServiceImp.getProductById(id);
        return ResponseEntity.ok(productResponse);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editProductById(@ModelAttribute ProductDTO productDTO, @PathVariable int id) {
        boolean isEditProductById = productServiceImp.isEditProductById(productDTO, id);

        if(isEditProductById) {
            return ResponseEntity.ok("Edit brand successfully");
        }
        return ResponseEntity.badRequest().body("Edit brand fail");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable int id) {
        String deleteBrand = productServiceImp.deleteProductdById(id);

        return ResponseEntity.ok(deleteBrand);
    }
}
