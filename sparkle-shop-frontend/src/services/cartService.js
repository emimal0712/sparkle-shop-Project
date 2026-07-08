import API from "../api/api";

// ADD TO CART
export const addToCart = async (productId) => {

    try {

        const response = await API.post(
            `/cart/add/${productId}`
        );

        return response.data;

    } catch (error) {

        console.error(
            "ADD TO CART ERROR:",
            error
        );

        throw error;
    }
};

// GET CART ITEMS
export const getCart = async () => {

    try {

        const response = await API.get(
            "/cart"
        );

        return response.data;

    } catch (error) {

        console.error(
            "GET CART ERROR:",
            error
        );

        throw error;
    }
};

// REMOVE CART ITEM
export const removeCartItem = async (cartId) => {

    try {

        const response = await API.delete(
            `/cart/remove/${cartId}`
        );

        return response.data;

    } catch (error) {

        console.error(
            "REMOVE CART ITEM ERROR:",
            error
        );

        throw error;
    }
};