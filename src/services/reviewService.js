import axios from "axios";

const API_BASE_URL =
    "http://localhost:8081/api/reviews";

export const createReview =
    async (reviewData) => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.post(
                API_BASE_URL,
                reviewData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };

export const getHotelReviews =
    async (hotelId) => {

        const response =
            await axios.get(
                `${API_BASE_URL}/hotel/${hotelId}`
            );

        return response.data;

    };