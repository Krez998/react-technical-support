import axios from "axios";

export const fetchRequests = async (filter) => {
 try {
    var response = await axios.get("https://localhost:7257/api/Request", {
      params: {
         status: filter?.status,
      }
    });
    console.log(response);
    return response.data;  
 }
 catch (e) {
    console.error(e);
 }
};


export const createRequest = async (request) => {
   try {
      console.log(request);
      var response = await axios.post("https://localhost:7257/api/Request", request);
      console.log(response.status);
   }
   catch (e) {
      console.error(e);
   }
};