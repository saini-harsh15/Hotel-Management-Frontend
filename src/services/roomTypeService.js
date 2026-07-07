import axios from "axios";

const API_BASE_URL =
    "https://finalhotel-production.up.railway.app/api";

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
                `https://finalhotel-production.up.railway.app/api/hotels/${hotelId}/room-types`,
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