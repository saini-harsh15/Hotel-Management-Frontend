import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/hotels";

export const getAllHotels = async () => {


    const response = await axios.get(
        API_BASE_URL
    );

    return response.data;

};

export const searchHotelsByCity = async (city) => {

    const response = await axios.get(
        "http://localhost:8081/api/hotels/search/city",
        {
            params: {
                city: city
            }
        }
    );

    return response.data;

};

export const getHotelById = async (hotelId) => {

    const response = await axios.get(
        `http://localhost:8081/api/hotels/${hotelId}`
    );

    return response.data;

};

export const getMyHotels =
    async () => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.get(
                `${API_BASE_URL}/my-hotels`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };

export const createHotel =
    async (hotelData) => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.post(
                API_BASE_URL,
                hotelData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };