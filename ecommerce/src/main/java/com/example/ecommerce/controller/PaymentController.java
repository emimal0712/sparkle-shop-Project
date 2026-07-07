package com.example.ecommerce.controller;

import com.example.ecommerce.model.Order;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.service.PaymentService;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/payment")
@CrossOrigin
public class PaymentController {


    @Autowired
    private PaymentService paymentService;


    @Autowired
    private OrderRepository orderRepository;



    // Create Razorpay Order
    @PostMapping("/create")
    public String createPayment(
            @RequestParam double amount
    ) throws Exception {


        JSONObject order =
                paymentService.createRazorpayOrder(amount);


        return order.toString();
    }



    // Verify Payment
    @PostMapping("/verify")
    public String verifyPayment(

            @RequestParam String razorpayOrderId,

            @RequestParam String paymentId

    ) {


        Order order =
                orderRepository.findAll()
                        .stream()
                        .filter(o ->
                                razorpayOrderId.equals(
                                        o.getRazorpayOrderId()
                                )
                        )
                        .findFirst()
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Order Not Found!"
                                )
                        );


        order.setPaymentId(paymentId);

        order.setStatus("PAID");


        orderRepository.save(order);


        return "Payment Successful!";
    }
}