import "./Login.css";
import { useState } from "react";
import { login, getUserId } from "../../services/LoginServices";
import { fetchUser } from "../../services/UserServices";

function Login({ onAuth }) {
  const [userData, setUserData] = useState({ login: "", password: "" });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = await login(userData);
      localStorage.setItem("token", token);

      const userId = await getUserId();
      if (userId) {
        localStorage.setItem("userId", userId);
        const user = await fetchUser(userId);
        onAuth(user);
      } else {
        throw new Error("Не удалось получить userId.");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Авторизация</h2>
        <input
          type="text"
          placeholder="Логин"
          value={userData.login}
          onChange={(e) => setUserData({ ...userData, login: e.target.value })}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <button type="submit">Войти</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default Login;
