package com.example.ecommerce.service;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    //Create
    public List<Product> addProducts(List<Product> products) {
        return productRepository.saveAll(products);
    }

    //Read All
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    //Read One
    public Product getProductById(Integer id) {
                return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product Not Found with Id: " + id));
    }

    //Update
    public Product updateProduct(Integer id, Product newProduct) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product Not Found with Id: " + id));

        existing.setName(newProduct.getName());
        existing.setDescription(newProduct.getDescription());
        existing.setPrice(newProduct.getPrice());
        existing.setQuantity(newProduct.getQuantity());
        existing.setImage(newProduct.getImage());
        existing.setCategory(newProduct.getCategory());
        existing.setRating(newProduct.getRating());

        return productRepository.save(existing);
    }
    // Delete
    public void deleteProduct(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product Not Found with Id: " + id));
        productRepository.delete(product);
    }
}
