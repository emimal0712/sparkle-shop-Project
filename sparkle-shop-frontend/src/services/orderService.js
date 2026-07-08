import API from "../api/api";

// CHECKOUT
export const checkout = async (userId) => {

    try {

        const response = await API.post(
            `/orders/checkout?userId=${userId}`
        );

        return response.data;

    } catch (error) {

        console.error(
            "CHECKOUT ERROR:",
            error
        );

        throw error;
    }
};

// VERIFY PAYMENT
export const verifyPayment = async (
    orderId,
    razorpayPaymentId
) => {

    try {

        const response = await API.post(
            "/orders/verify-payment",
            {
                orderId,
                razorpayPaymentId
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "VERIFY PAYMENT ERROR:",
            error
        );

        throw error;
    }
};

// GET ORDERS
export const getOrders = async () => {
  const response = await API.get("/orders");
  return response.data;
};