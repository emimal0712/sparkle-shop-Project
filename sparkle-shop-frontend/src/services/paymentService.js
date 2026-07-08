import API from "../api/api";

// CREATE PAYMENT
export const createPayment = async () => {
  const response = await API.post("/payment/create");
  return response.data;
};

// VERIFY PAYMENT
export const verifyPayment = async (razorpayOrderId, paymentId) => {
  const response = await API.post(
    `/payment/verify?razorpayOrderId=${razorpayOrderId}&paymentId=${paymentId}`
  );
  return response.data;
};