import axios from "axios";
const API_URL = import.meta.env.VITE_ENDPOINT;

// Get User Profile

export const getUserProfile = async (mobile) => {
    const response = await axios.get(`${API_URL}/user/${mobile}`);
    return response.data;
};


//  Get Agents account pending 

export const getAgentswithPending = async () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;

  try {
    const response = await axios.get(`${API_URL}/user/agentspending`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching agents with pending status:", error);
    throw error;
  }
};

//  Get Agents Balance Recharge

export const getAgentswithRechargeRequest = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
  
    try {
      const response = await axios.get(`${API_URL}/user/agentsRescharge`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching agents with recharge requests:", error);
      throw error;
    }
};
//  Get All users

export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/user/`);
    return response.data;
};
//  Get Count of Users

export const getCountOfUsers = async () => {
    const response = await axios.get(`${API_URL}/user/count`);
    return response?.data.totalUsers;
};

//  update Aegnts account Status

export const updateAgentAccountStatus = async (mobile, approval) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
    // console.log("token",token);
    try {
        const response = await axios.patch(
          `${API_URL}/user/${mobile}`,
          { approval },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error updating agent account status:", error);
        throw error;
      }
};


// Get total users balance
export const getUsersBalance = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/get_users_balance`);
        return response.data.userTotalBalance;
    } catch (error) {
        console.error("Error fetching user balance:", error);
        return 0;
    }
};

// Get total agent balance
export const getAgentsBalance = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/get_agets_balance`);
        return response.data.agentTotalBalance;
    } catch (error) {
        console.error("Error fetching agent balance:", error);
        return 0;
    }
};