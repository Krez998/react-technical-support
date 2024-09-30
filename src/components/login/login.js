import "./login.css";
import { useState } from "react";
import { login } from "../../services/LoginServices";

function Login({ onAuth }) {
    const [userData, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        //onAuth(userData);
        
        login(userData)
          .then((response) => {
              if (response.status === 200) {
                  onAuth(response.data);
                  setError(null);
                } else {
                  setError(response.data);
                }
        });
    };

    return (
        <div>         
          <form onSubmit={handleSubmit} className="login-form">
            <h2>Авторизация</h2>
            <input type="text" 
                placeholder="Логин"
                onChange={(e) => setData({...userData, username: e.target.value})} />
            <input type="password" 
                placeholder="Пароль"
                onChange={(e) => setData({...userData, password: e.target.value})} />

            <button type="submit">Войти</button>
          </form>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      );
};

export default Login;