import API from "../api/api";

// REGISTER
export const registerUser = async (userData) => {

    const response = await API.post(
        "/users",
        userData
    );

    return response.data;
};

// LOGIN
export const loginUser = async (
    username,
    password
) => {

    const response = await API.post(
        `/auth/login?username=${username}&password=${password}`
    );

    return response.data;
};