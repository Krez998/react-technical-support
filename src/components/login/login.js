import "./login.css";
import { useState } from "react";
import { login } from "../../services/LoginServices";

function Login({ onAuth }) {
    const [userData, setUserData] = useState({ login: '', password: '' });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
          const response = await login(userData);
          if (response.status === 200) {
            onAuth(response.data.user);
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('token', response.data.token);
          } else {
            setError(response.data);
          }
        } catch (err) {
          setError("Произошла ошибка при входе. Пожалуйста, попробуйте снова.");
        }

        // login(userData)
        //   .then((response) => {
        //       if (response.status === 200) {
        //           onAuth(response.data.user);
        //           localStorage.setItem('token', response.data.token);
        //           setError(null);
        //         } else {
        //           setError(response.data);
        //         }
        // });
    };

    return (
        <div>         
          <form onSubmit={handleSubmit} className="login-form">
            <h2>Авторизация</h2>
            <input 
              type="text"
              placeholder="Логин"
              value={userData.login}
              onChange={(e) => setUserData({...userData, login: e.target.value})} />
            <input 
              type="password"
              placeholder="Пароль"
              value={userData.password}
              onChange={(e) => setUserData({...userData, password: e.target.value})} />
            <button type="submit">Войти</button>
          </form>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      );
};

export default Login;