import axios from "axios";

const API_BASE_URL =
    "http://localhost:8081/api/bookings";

export const createBooking =
    async (bookingData) => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.post(
                API_BASE_URL,
                bookingData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };

export const getMyBookings =
    async () => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.get(
                `${API_BASE_URL}/my-bookings`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };

export const cancelBooking =
    async (bookingId) => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.put(
                `${API_BASE_URL}/${bookingId}/cancel`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };

export const checkInBooking =
    async (bookingId) => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.put(
                `${API_BASE_URL}/${bookingId}/check-in`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };

export const checkOutBooking =
    async (bookingId) => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.put(
                `${API_BASE_URL}/${bookingId}/check-out`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };