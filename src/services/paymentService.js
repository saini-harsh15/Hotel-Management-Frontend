import axios from "axios";

const API_BASE_URL =
    "http://localhost:8081/api/payments";

export const createPayment =
    async (paymentData) => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.post(
                API_BASE_URL,
                paymentData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };