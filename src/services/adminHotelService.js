import axios from "axios";

const API_BASE_URL =
    "https://finalhotel-production.up.railway.app/api/admin/hotels";

const getAuthHeader = () => {

    const token =
        localStorage.getItem("token");

    return {
        headers: {
            Authorization:
                `Bearer ${token}`
        }
    };

};

export const getPendingHotels =
    async () => {

        const response =
            await axios.get(
                `${API_BASE_URL}/pending`,
                getAuthHeader()
            );

        return response.data;

    };

export const approveHotel =
    async (hotelId) => {

        const response =
            await axios.put(
                `${API_BASE_URL}/${hotelId}/approve`,
                {},
                getAuthHeader()
            );

        return response.data;

    };

export const rejectHotel =
    async (hotelId) => {

        const response =
            await axios.put(
                `${API_BASE_URL}/${hotelId}/reject`,
                {},
                getAuthHeader()
            );

        return response.data;

    };