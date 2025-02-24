import axios from "axios";
const API_URL = import.meta.env.VITE_ENDPOINT;

// Get User Profile

export const getUserProfile = async (mobile) => {
    const response = await axios.get(`${API_URL}/user/${mobile}`);
    return response.data;
};