import axios from "axios";

export const fetchExecutors = async () => {
  try {
    var response = await axios.get("https://localhost:7257/api/User/allExecutors");
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const createUser = async (user) => {
  try {
    var response = await axios.post("https://localhost:7257/api/User", user);
    return response;
  } catch (e) {
    console.error(e);
  }
};
