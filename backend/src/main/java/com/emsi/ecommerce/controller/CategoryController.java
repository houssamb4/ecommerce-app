package com.emsi.ecommerce.controller;

import com.emsi.ecommerce.entity.CategoryEntity;
import com.emsi.ecommerce.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;
    
    @GetMapping
    public List<CategoryEntity> list() {
        return categoryService.list();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CategoryEntity> get(@PathVariable Long id) {
        Optional<CategoryEntity> category = categoryService.get(id);
        return category.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public CategoryEntity create(@RequestBody CategoryEntity category) {
        return categoryService.create(category);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CategoryEntity> update(@PathVariable Long id, 
                                                @RequestBody CategoryEntity category) {
        try {
            CategoryEntity updated = categoryService.update(id, category);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}