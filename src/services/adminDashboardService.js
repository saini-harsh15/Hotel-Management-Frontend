import axios from "axios";

const API =
    "https://finalhotel-production.up.railway.app/api/admin/dashboard";

const getToken = () =>
    localStorage.getItem("token");

export const getDashboard = () =>
    axios.get(API, {
        headers: {
            Authorization:
                `Bearer ${getToken()}`
        }
    });