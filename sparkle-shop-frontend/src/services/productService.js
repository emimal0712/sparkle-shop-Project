import API from "../api/api";

// GET ALL PRODUCTS
export const getAllProducts = async () => {
  try {
    const response = await API.get("/products");
    return response.data;
  } catch (error) {
    console.error("FETCH PRODUCTS ERROR:", error);
    throw error;
  }
};

// GET SINGLE PRODUCT
export const getProductById = async (id) => {
  try {
    const response = await API.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("FETCH PRODUCT ERROR:", error);
    throw error;
  }
};