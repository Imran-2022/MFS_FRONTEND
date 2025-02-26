export const getAuthToken = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser?.token;
  };
  