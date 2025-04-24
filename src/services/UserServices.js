import axios from "axios";

export const createUser = async (user) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://localhost:7257/api/Users",
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const fetchUser = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://localhost:7257/api/Users?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchExecutors = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "https://localhost:7257/api/Users/allAgents",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
