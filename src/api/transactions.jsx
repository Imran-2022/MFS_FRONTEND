import axios from "axios";
const API_URL = import.meta.env.VITE_ENDPOINT;

// Cash-Out
export const cashOut = async (transactionData) => {
    const response = await axios.post(`${API_URL}/transaction`, transactionData);
    return response.data;
};

// Send-Money
export const sendMoney = async (transactionData) => {
    const response = await axios.post(`${API_URL}/transaction`, transactionData);
    return response.data;
};

// cash-In 

export const cashIn = async (transactionData) => {
    const response = await axios.post(`${API_URL}/transaction`, transactionData);
    return response.data;
};