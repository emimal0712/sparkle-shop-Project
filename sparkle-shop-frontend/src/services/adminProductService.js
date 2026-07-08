import API from "../api/api";

// ADD PRODUCT
export const addProduct = async (
    productData
) => {

    try {

        const response = await API.post(
            "/products/add",
            productData
        );

        return response.data;

    } catch (error) {

        console.log("ADD ERROR:", error);

        throw error;
    }
};

// UPDATE PRODUCT
export const updateProduct = async (
    id,
    productData
) => {

    try {

        const response = await API.put(

            `/products/update/${id}`,

            productData
        );

        return response.data;

    } catch (error) {

        console.log("UPDATE ERROR:", error);

        throw error;
    }
};

// DELETE PRODUCT
export const deleteProduct = async (
    id
) => {

    try {

        const response = await API.delete(

            `/products/delete/${id}`

        );

        return response.data;

    } catch (error) {

        console.log("DELETE ERROR:", error);

        throw error;
    }
};