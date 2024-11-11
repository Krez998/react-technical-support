import axios from "axios";

export const fetchExecutors = async () => {
  try {
    var response = await axios.get("https://localhost:7257/api/User");
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
