import axios from "axios";

export const login = async (data) => {
   try {
      var response = await axios.post(`https://localhost:7257/login?login=${data.login}&password=${data.password}`);
      return response;
   }
   catch (e) {
      console.error(e);
      return { status: e.response.status, data: e.response.data };
   }
};