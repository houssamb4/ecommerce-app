package com.emsi.ecommerce.service;

import com.emsi.ecommerce.entity.ProductEntity;
import com.emsi.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    public ProductEntity create(ProductEntity p) {
        return productRepository.save(p);
    }
    
    public ProductEntity update(Long id, ProductEntity p) {
        p.setId(id);
        return productRepository.save(p);
    }
    
    public void delete(Long id) {
        productRepository.deleteById(id);
    }
    
    public Optional<ProductEntity> get(Long id) {
        return productRepository.findById(id);
    }
    
    public List<ProductEntity> list() {
        return productRepository.findAll();
    }
    
    public List<ProductEntity> listByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }
}