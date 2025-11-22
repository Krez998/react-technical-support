import axios from "axios";

export const createTicket = async (ticket) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://localhost:7257/api/Tickets",
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

export const fetchTicket = async (id) => {
  try {
    console.log("fetchTicket" + "  id:" + id);

    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://localhost:7257/api/Tickets/${id}`,
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

export const fetchTickets = async (filter) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("https://localhost:7257/api/Tickets", {
      params: {
        status: filter?.status,
        isShowNotAssigned: filter?.isShowNotAssigned,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const changeTicketStatus = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `https://localhost:7257/api/Tickets/setStatus/${data.id}?status=${data.status}`,
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
      `https://localhost:7257/api/Tickets/setAgent/${data.id}?agentId=${data.executorId}`,
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

export const sendMessage = async (data) => {
  try {
    console.log("Отправка сообщения:");
    console.log(data);

    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://localhost:7257/api/Messages/send",
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

export const createChat = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://localhost:7257/api/Messages/createChat",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Создан чат с id: " + response.data);

    return response.data;
  } catch (e) {
    console.error(e);
  }
};
