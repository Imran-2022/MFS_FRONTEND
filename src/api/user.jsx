import axios from "axios";
const API_URL = import.meta.env.VITE_ENDPOINT;

// Get User Profile

export const getUserProfile = async (mobile) => {
    const response = await axios.get(`${API_URL}/user/${mobile}`);
    return response.data;
};


//  Get Agents account pending 

export const getAgentswithPending = async () => {
    const response = await axios.get(`${API_URL}/user/agentspending`);
    return response.data;
};

//  update Aegnts account Status

export const updateAgentAccountStatus = async (mobile, approval) => {
    try {
        const response = await axios.patch(`${API_URL}/user/${mobile}`, {
            approval: approval,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating agent account status:", error);
        throw error;
    }
};
