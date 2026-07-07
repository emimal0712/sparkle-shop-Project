package com.example.ecommerce.service;

import com.example.ecommerce.model.*;
import com.example.ecommerce.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentService paymentService;

    // Checkout
    public Order placeOrder(Integer userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart Not Found!"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is Empty!");
        }

        Order order = new Order();
        order.setUserId(userId);
        order.setStatus("PENDING");

        double total = 0;

        for (CartItem cartItem : cart.getItems()) {

            Product product = productRepository.findById(cartItem.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product Not Found!"));

            // Stock Validation
            if (product.getQuantity() < cartItem.getQuantity()) {
                throw new RuntimeException("Insufficient Stock for Product: " + product.getName());
            }

            // Reduce Stock
            product.setQuantity(product.getQuantity() - cartItem.getQuantity());
            productRepository.save(product);

            // Create Order Item
            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(product.getId());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(product.getPrice());
            orderItem.setOrder(order);

            order.getItems().add(orderItem);
            total += product.getPrice() * cartItem.getQuantity();
        }


        order.setTotalAmount(total);

        Order savedOrder = orderRepository.save(order);

        //Create Payment Order
        try{
            org.json.JSONObject razorpayOrder =
                    paymentService.createRazorpayOrder(total);
            savedOrder.setRazorpayOrderId(razorpayOrder.getString("id"));
            orderRepository.save(savedOrder);
        } catch (Exception e){
            e.printStackTrace();
            System.out.println("Payment Creation Failed! " + e.getMessage());
            throw new RuntimeException("Payment Creation Failed!");
        }

        // Clear Cart after Order
        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();
        cartRepository.save(cart);

        return savedOrder;
    }

    // View User Orders
    public java.util.List<Order> getUserOrders(Integer userId) {
        return orderRepository.findByUserId(userId);
    }
}
