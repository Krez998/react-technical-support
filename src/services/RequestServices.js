import axios from "axios";

export const fetchRequests = async (filter) => {
  try {
    var response = await axios.get("https://localhost:7257/api/Request", {
      params: {
        status: filter?.status,
        isShowNotAssigned: filter?.isShowNotAssigned,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchRequest = async (id) => {
  try {
    var response = await axios.get(`https://localhost:7257/api/Request/${id}`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const createRequest = async (request) => {
  try {
    var response = await axios.post(
      "https://localhost:7257/api/Request",
      request
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const changeRequestStatus = async (data) => {
  try {
    var response = await axios.patch(
      `https://localhost:7257/api/Request/${data.id}?status=${data.status}`
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const changeRequestExecutor = async (data) => {
  try {
    var response = await axios.patch(
      `https://localhost:7257/api/Request/executor/${data.id}?executorId=${data.executorId}`
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};
