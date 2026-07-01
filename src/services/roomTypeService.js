import axios from "axios";

const API_BASE_URL =
    "http://localhost:8081/api";

export const getRoomTypesByHotel =
    async (hotelId) => {

        const response =
            await axios.get(
                `${API_BASE_URL}/hotels/${hotelId}/room-types`
            );

        return response.data;

    };

export const createRoomType =
    async (hotelId, roomType) => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.post(
                `http://localhost:8081/api/hotels/${hotelId}/room-types`,
                roomType,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };