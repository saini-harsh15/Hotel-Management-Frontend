import axios from "axios";

export const getRoomTypesByHotel =
    async (hotelId) => {

        const response =
            await axios.get(
                `http://localhost:8081/api/hotels/${hotelId}/room-types`
            );

        return response.data;

    };