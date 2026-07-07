package com.example.ecommerce.service;

import com.example.ecommerce.model.*;
import com.example.ecommerce.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    // Get or Create Cart
    public Cart getOrCreateCart(Integer userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUserId(userId);
                    return cartRepository.save(cart);
                });
    }

    // Add to Cart
    public Cart addToCart(Integer userId, Integer productId, int quantity) {
        Cart cart = getOrCreateCart(userId);

        //Validate Product
        productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        // Check existing item
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartItemRepository.save(item);
        } else {
            CartItem newItem = new CartItem();
            newItem.setProductId(productId);
            newItem.setQuantity(quantity);
            newItem.setCart(cart);

            cartItemRepository.save(newItem);
            cart.getItems().add(newItem);
        }
        return cartRepository.save(cart);
    }

    // View a Cart
    public Cart viewCart(Integer userId) {
        return cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart Not Found"));
    }

    // Remove Item
    public String removeItem(Integer itemId) {
        cartItemRepository.deleteById(itemId);
        return "Item Removed";
    }
}
