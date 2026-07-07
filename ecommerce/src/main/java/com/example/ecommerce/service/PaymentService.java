package com.example.ecommerce.service;

import com.razorpay.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class PaymentService {

    private static final String KEY = "rzp_test_TAjzviCHgKp0xM";
    private static final String SECRET = "ylxM5CiUWbVVdZkUMNCyxBnq";

    // Create Razorpay Order
    public JSONObject createRazorpayOrder(double amount) throws RazorpayException {


        RazorpayClient client =
                new RazorpayClient(KEY, SECRET);


        JSONObject options = new JSONObject();


        options.put("amount", (int)(amount * 100));
        options.put("currency", "INR");
        options.put("receipt", "txt_123");


        Order order = client.orders.create(options);


        return order.toJson();
    }
}