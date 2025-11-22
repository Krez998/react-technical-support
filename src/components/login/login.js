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
    <div className="login-background">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Вход в систему</h1>
        <label for="userName">Логин</label>
        <input
          id="userName"
          type="text"
          // placeholder="Логин"
          value={userData.login}
          onChange={(e) => setUserData({ ...userData, login: e.target.value })}
        />

        <label for="password">Пароль</label>
        <input
          id="password"
          type="password"
          // placeholder="Пароль"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <p>
          Если нет учетной записи - перейти на страницу{" "}
          <a href="https://example.com">регистрации</a>
        </p>
        <button type="submit">Войти</button>
        <a href="https://example.com">Восстановить доступ</a>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default Login;
