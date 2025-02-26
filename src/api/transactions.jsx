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
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;

    try {
        const response = await axios.post(`${API_URL}/transaction`, transactionData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in cash-in transaction:", error);
        throw error;
    }
};

// Get User Transactions
export const getUserTransactions = async (mobile) => {
    const response = await axios.get(`${API_URL}/transaction/${mobile}`);
    return response.data;
};


// Get All Transactions
export const getAllTransactions = async () => {
    const response = await axios.get(`${API_URL}/transaction/`);
    return response.data;
};
