package com.emsi.ecommerce.service;

import com.emsi.ecommerce.entity.CategoryEntity;
import com.emsi.ecommerce.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public CategoryEntity create(CategoryEntity c) {
        return categoryRepository.save(c);
    }
    
    public CategoryEntity update(Long id, CategoryEntity c) {
        c.setId(id);
        return categoryRepository.save(c);
    }
    
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }
    
    public Optional<CategoryEntity> get(Long id) {
        return categoryRepository.findById(id);
    }
    
    public List<CategoryEntity> list() {
        return categoryRepository.findAll();
    }
}