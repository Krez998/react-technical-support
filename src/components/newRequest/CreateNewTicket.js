import "./CreateNewTicket.css";
import { useState } from "react";

function CreateNewTicket({ onClose, onCreate }) {
  const [ticket, setTicket] = useState({
    userId: localStorage.getItem("userId"),
    status: 1,
    issueType: "Принтер",
    priority: "срочно",
  });

  const submit = (e) => {
    e.preventDefault();
    onCreate(ticket);
    //setRequest(null);
  };

  const onInputClickHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="new-ticket-container">
      <form onSubmit={submit} className="new-ticket-form">
        <h1>Создание заявки</h1>
        <label>Заголовок</label>
        <input
          onFocusCapture={onInputClickHandler}
          placeholder="Заголовок"
          onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
        />
        <label>Категория</label>
        <select
          placeholder="Категория"
          value={ticket.issueType}
          onChange={(e) => setTicket({ ...ticket, issueType: e.target.value })}
        >
          <option>Программа</option>
          <option>Компьютер/тонкий клиент</option>
          <option>Принтер</option>
          <option>Проблема с доступом/утеря логина или пароля</option>
          <option>Прочее</option>
        </select>
        <label>Приоритет</label>
        <select
          placeholder="Приоритет"
          value={ticket.priority}
          onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
        >
          <option>очень срочно</option>
          <option>срочно</option>
        </select>
        <label>Описание</label>
        <textarea
          placeholder="Описание"
          onChange={(e) =>
            setTicket({ ...ticket, description: e.target.value })
          }
        />
        <div>
          <button onClick={onClose} type="button">
            Назад
          </button>
          <button type="submit">Создать заявку</button>
        </div>
      </form>
    </div>

    // <form onSubmit={submit} className="new-ticket-form">
    //     <h1>Создание заявки</h1>
    //     <input
    //         placeholder="UserId"
    //         onChange={(e) => setTicket({...ticket, userId: e.target.value })}/>
    //     <input
    //         placeholder="Тип проблемы"
    //         onChange={(e) => setTicket({...ticket, issueType: e.target.value })}/>
    //     <input
    //         placeholder="Приоритет"
    //         onChange={(e) => setTicket({...ticket, priority: e.target.value })}/>
    //     <input
    //         placeholder="Заголовок"
    //         onChange={(e) => setTicket({...ticket, title: e.target.value })}/>
    //     <textarea
    //         placeholder="Описание"
    //         onChange={(e) => setTicket({...ticket, description: e.target.value })}/>
    //     <button type="submit" color="blue">Создать</button>
    // </form>
  );
}

export default CreateNewTicket;
