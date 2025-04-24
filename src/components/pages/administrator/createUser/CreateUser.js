import "./CreateUser.css";
import { useState } from "react";
import { createUser } from "../../../../services/UserServices";

function CreateUser({ onClose }) {
  const [userData, setUserData] = useState({
    login: null,
    password: null,
    firstName: null,
    lastName: null,
    patronymic: null,
    role: 0,
  });
  //const [error, setError] = useState();

  const submit = async (e) => {
    e.preventDefault();
    //setError(null);

    const response = await createUser(userData);

    if (response.status !== 200) {
      // преобразование объекта ошибок в массив строк
      //const errorMessages = Object.values(response.response.data.errors).flat();
      alert(Object.values(response.response.data.errors).flat());
    } else if (response.status === 200) {
      alert("Пользователь успешно создан!");
    }
  };

  return (
    <div>
      <form onSubmit={submit} className="new-user-form">
        <h1>Создание пользователя</h1>
        <label>Имя:</label>
        <input
          onChange={(e) =>
            setUserData({ ...userData, firstName: e.target.value })
          }
        />
        <label>Фамилия:</label>
        <input
          onChange={(e) =>
            setUserData({ ...userData, lastName: e.target.value })
          }
        />
        <label>Отчество:</label>
        <input
          onChange={(e) =>
            setUserData({ ...userData, patronymic: e.target.value })
          }
        />
        <label>Логин:</label>
        <input
          onChange={(e) => setUserData({ ...userData, login: e.target.value })}
        />
        <label>Пароль:</label>
        <input
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <label>Роль:</label>
        <select
          value={userData.role}
          onChange={(e) =>
            setUserData({ ...userData, role: Number(e.target.value) })
          }
        >
          <option value={0}>Пользователь</option>
          <option value={1}>Исполнитель</option>
          <option value={2}>Администратор</option>
        </select>
        <div>
          <button onClick={onClose} type="button">
            Назад
          </button>
          <button type="submit" color="blue">
            Создать
          </button>
        </div>
      </form>
      {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
    </div>
  );
}

export default CreateUser;
