import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/auth";

export const login = async (email, password) => {

    const response = await axios.post(
        `${API_BASE_URL}/login`,
        {
            email,
            password
        }
    );

    return response.data;


};

export const register =
    async (userData) => {

        const response =
            await axios.post(
                "http://localhost:8081/api/auth/register",
                userData
            );

        return response.data;

    };