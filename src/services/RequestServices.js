import axios from "axios";

export const fetchRequests = async () => {
 try {
    var response = await axios.get("https://localhost:7257/api/TechnicalSupport");
    //console.log(response);
    return response.data;  
 }
 catch (e) {
    console.error(e);
 }
};


export const createRequest = async (request) => {
   try {
      var response = await axios.post("https://localhost:7257/api/TechnicalSupport", request);
      console.log(response.status);
   }
   catch (e) {
      console.error(e);
   }
};