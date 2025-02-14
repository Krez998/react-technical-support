import axios from "axios";

export const fetchRequests = async (filter) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "https://localhost:7257/api/Request", {
        params: {
          status: filter?.status,
          isShowNotAssigned: filter?.isShowNotAssigned,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchRequest = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://localhost:7257/api/Request/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const createRequest = async (request) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://localhost:7257/api/Request",
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const changeRequestStatus = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `https://localhost:7257/api/Request/setStatus/${data.id}?status=${data.status}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const changeRequestExecutor = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `https://localhost:7257/api/Request/setExecutor/${data.id}?executorId=${data.executorId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};
