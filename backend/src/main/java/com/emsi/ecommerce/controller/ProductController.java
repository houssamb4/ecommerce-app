package com.emsi.ecommerce.controller;

import com.emsi.ecommerce.entity.ProductEntity;
import com.emsi.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @GetMapping
    public List<ProductEntity> list() {
        return productService.list();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductEntity> get(@PathVariable Long id) {
        Optional<ProductEntity> product = productService.get(id);
        return product.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/category/{categoryId}")
    public List<ProductEntity> listByCategory(@PathVariable Long categoryId) {
        return productService.listByCategory(categoryId);
    }
    
    @PostMapping
    public ProductEntity create(@RequestBody ProductEntity product) {
        return productService.create(product);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ProductEntity> update(@PathVariable Long id, 
                                               @RequestBody ProductEntity product) {
        try {
            ProductEntity updated = productService.update(id, product);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}