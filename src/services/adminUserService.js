import axios from "axios";

const API =
    "http://localhost:8081/api/admin/users";

const getToken = () =>
    localStorage.getItem("token");

const headers = () => ({
    Authorization: `Bearer ${getToken()}`
});

export const getAllUsers = () =>
    axios.get(API, {
        headers: headers()
    });

export const getUsersByRole = (role) =>
    axios.get(
        `${API}/role?role=${role}`,
        {
            headers: headers()
        }
    );

export const updateUserRole = (
    userId,
    role
) =>
    axios.put(
        `${API}/${userId}/role`,
        {
            role
        },
        {
            headers: headers()
        }
    );

export const updateUserStatus = (
    userId,
    status
) =>
    axios.put(
        `${API}/${userId}/status`,
        {
            status
        },
        {
            headers: headers()
        }
    );