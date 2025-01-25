import "./CreateUser.css";
import { useState } from "react";

function CreateUser({ onCreate }) {
  const [userData, setUserData] = useState({
    login: null,
    password: null,
    firstName: null,
    lastName: null,
    patronymic: null,
    userType: 0,
  });

  const submit = (e) => {
    e.preventDefault();
    onCreate(userData);
  };

  return (
    <form onSubmit={submit} className="new-user-form">
      <h1>Создание пользователя</h1>
      <label>Имя</label>
      <input
        placeholder="Имя"
        onChange={(e) =>
          setUserData({ ...userData, firstName: e.target.value })
        }
      />
      <label>Фамилия</label>
      <input
        placeholder="Фамилия"
        onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
      />
      <label>Отчество</label>
      <input
        placeholder="Отчество"
        onChange={(e) =>
          setUserData({ ...userData, patronymic: e.target.value })
        }
      />
      <label>Логин</label>
      <input
        placeholder="Логин"
        onChange={(e) => setUserData({ ...userData, login: e.target.value })}
      />
      <label>Пароль</label>
      <input
        placeholder="Пароль"
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <label>Роль</label>
      <select
        placeholder="Категория"
        value={userData.userType}
        onChange={(e) => setUserData({ ...userData, userType: Number(e.target.value) })}>
        <option value={0}>Пользователь</option>
        <option value={1}>Исполнитель</option>
        <option value={2}>Администратор</option>
      </select>
      <button type="submit" color="blue">Создать</button>
    </form>
  );
}

export default CreateUser;
