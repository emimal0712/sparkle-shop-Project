package com.example.ecommerce.controller;

import com.example.ecommerce.model.Cart;
import com.example.ecommerce.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public Cart addToCart(
            @RequestParam Integer userId,
            @RequestParam Integer productId,
            @RequestParam int quantity
    ) {
        return cartService.addToCart(userId, productId, quantity);
    }

    @GetMapping("/{userId}")
    public Cart viewCart(@PathVariable Integer userId) {
        return cartService.viewCart(userId);
    }

    @DeleteMapping("/remove/{itemId}")
    public String removeItem(@PathVariable Integer itemId) {
        return cartService.removeItem(itemId);

    }
}
