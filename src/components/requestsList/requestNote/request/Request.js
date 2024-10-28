import { useState } from "react";
import "../request/Request.css";

const Request = (props) => {
  const [status, setNewStatus] = useState(props.status);



  return (
    <div className="request">
      <h1>Заявка</h1>
      <label>Номер заявки</label>
      <input readOnly value={props.requestNumber}></input>
      <label>Заголовок</label>
      <input readOnly value={props.title}></input>
      <label>Статус</label>
      <select
        value={status}
        onChange={(e) => setNewStatus(e.target.value)}>
        <option value={0}>Создан</option>
        <option value={1}>Назначен</option>
        <option value={2}>В обработке</option>
        <option value={3}>На удержании</option>
        <option value={4}>Решен</option>
        <option value={5}>Закрыт</option>
        <option value={6}>Переоткрыт</option>
        <option value={7}>Отменен (самим пользователем)</option>
      </select>

      {/* <input readOnly value={props.status}></input> */}
      <div>
        <button onClick={props.onCloseRequest}>Назад</button>
        {console.log(props.status + " :: " + status)}
        {props.status === status && null}
        {props.status !== status && (<button>Сохранить изменения</button>)}
      </div>
    </div>
  );
};

export default Request;
