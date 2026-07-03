import axios from "axios";

const API =
    "http://localhost:8081/api/admin/dashboard";

const getToken = () =>
    localStorage.getItem("token");

export const getDashboard = () =>
    axios.get(API, {
        headers: {
            Authorization:
                `Bearer ${getToken()}`
        }
    });