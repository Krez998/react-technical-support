import axios from "axios";

export const login = async (data) => {
   try {
      var response = await axios.post("https://localhost:7257/api/Auth", data);
      console.log(response.status);
      console.log(response.data);
      return response;
   }
   catch (e) {
      console.error(e);
      return { status: e.response.status, data: e.response.data };
   }
};