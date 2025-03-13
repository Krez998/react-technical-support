import axios from "axios";

export const fetchTickets = async (filter) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "https://localhost:7257/api/Ticket", {
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

export const fetchTicket = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://localhost:7257/api/Ticket/${id}`,
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

export const createTicket = async (ticket) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://localhost:7257/api/Ticket",
      ticket,
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

export const changeTicketStatus = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `https://localhost:7257/api/Ticket/setStatus/${data.id}?status=${data.status}`,
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

export const changeTicketAgent = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `https://localhost:7257/api/Ticket/setAgent/${data.id}?agentId=${data.executorId}`,
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

export const createMessage = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://localhost:7257/api/Ticket/sendMessage", 
      data,
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
