import axios from "axios";

export const fetchExecutors = async () => {
  try {
    const token = localStorage.getItem("token");
    var response = await axios.get(
      "https://localhost:7257/api/User/allAgents",
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

export const createUser = async (user) => {
  try {
    const token = localStorage.getItem("token");
    var response = await axios.post("https://localhost:7257/api/User", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};
