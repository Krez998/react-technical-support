import axios from "axios";

export const login = async (data) => {
  try {
    const response = await axios.get(
      `https://localhost:7257/login?login=${data.login}&password=${data.password}`
    );

    if (response.data === null)
      throw new Error(
        "Произошла ошибка при входе. Пожалуйста, попробуйте снова."
      );

    return response.data;
  } catch (e) {
    console.error(e);
    return { status: e.response.status, data: e.response.data };
  }
};

export const getUserId = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("https://localhost:7257/userId", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data === null)
      throw new Error("Не найден идентификатор пользователя.");

    return response.data;
  } catch (e) {
    console.error(e);
    return { status: e.response.status, data: e.response.data };
  }
};
