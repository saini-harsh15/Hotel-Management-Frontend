import axios from "axios";

const API_BASE_URL =
    "http://localhost:8081/api/room-types";

export const getRoomsByRoomType =
    async (roomTypeId) => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.get(
                `${API_BASE_URL}/${roomTypeId}/rooms`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };

export const createRoom =
    async (roomTypeId, roomData) => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.post(
                `${API_BASE_URL}/${roomTypeId}/rooms`,
                roomData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };

export const updateRoom =
    async (
        roomTypeId,
        roomId,
        roomData
    ) => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.put(
                `${API_BASE_URL}/${roomTypeId}/rooms/${roomId}`,
                roomData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };

export const updateRoomStatus =
    async (
        roomTypeId,
        roomId,
        status
    ) => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.patch(
                `${API_BASE_URL}/${roomTypeId}/rooms/${roomId}/status`,
                {
                    status
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };

export const deleteRoom =
    async (
        roomTypeId,
        roomId
    ) => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.delete(
                `${API_BASE_URL}/${roomTypeId}/rooms/${roomId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };