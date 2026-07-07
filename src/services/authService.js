import axios from "axios";

const API_BASE_URL = "https://finalhotel-production.up.railway.app/api/auth";

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
                "https://finalhotel-production.up.railway.app/api/auth/register",
                userData
            );

        return response.data;

    };