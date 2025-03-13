import {
  fetchTicket,
  createMessage,
} from "../../../../../services/TicketServices";
import { useEffect, useState } from "react";
import "./UserRequest.css";
import moment from "moment";
import "moment/locale/ru";
moment.locale();

function UserRequest(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestStatus, setStatus] = useState("");
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchTicket(props.id);
      setData(response);
      setLoading(false);
      console.log(response);
    };

    loadData();
  }, [props.id]);

  useEffect(() => {
    if (data) {
      getStatus();
    }
  }, [data]);

  const getStatus = () => {
    switch (data.status) {
      case 0:
        setStatus("создан");
        return;
      case 1:
        setStatus("назначен");
        return;
      case 2:
        setStatus("в обработке");
        return;
      case 3:
        setStatus("на удержании");
        return;
      case 4:
        setStatus("решен");
        return;
      case 5:
        setStatus("закрыт");
        return;
      case 6:
        setStatus("переоткрыт");
        return;
      case 7:
        setStatus("отменен (самим пользователем)");
        return;
    }
  };

  const sendMessage = async () => {  
    if(!data.chatId) return; // нельзя отправить сообщение пока не создан чат

    const userId = localStorage.getItem("userId");
    const newMessage = {
      senderId: userId,
      chatId: data.chatId,
      content: messageContent,
    };
    const response = await createMessage(newMessage);
    const updatedData = await fetchTicket(props.id);
    setData(updatedData);
    {
      response && setMessageContent("");
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <div>Нет данных для отображения</div>;
  }

  return (
    <div className="request-background">
      <div className="request-content">
        <button
          className="request-content-return-btn"
          type="button"
          onClick={props.onCloseRequest}
        >
          Мои заявки
        </button>
        <div className="request-info">
          <div className="request-info-first-row">
            <h1>{data.id}</h1>
            <div>
              <p>Статус: {requestStatus}</p>
              <p>
                Исполнитель:{" "}
                {data.executorFullName == null
                  ? "не назначен"
                  : data.executorFullName}
              </p>
            </div>
            <div>
              <p>
                Дата и время:{" "}
                {moment(data.createdAt).format("D MMMM YYYY, HH:mm")}
              </p>
              <p>Кем создан: {data.userFullName}</p>
            </div>
          </div>
          <div className="request-info-second-row">
            <p>{data.description}</p>
          </div>
        </div>

        <ul className="request-chat">
          {data.messages.map((message) => {
            if (data.userId === message.senderId) {
              return (
                <li className="request-self-message" key={message.id}>
                  <div>{message.content}</div>
                </li>
              );
            } else {
              return (
                <li className="request-other-message" key={message.id}>
                  <div>{message.content}</div>
                </li>
              );
            }
          })}
        </ul>
        <div className="message-input-container">
          <input
            placeholder="Введите ваще сообщение..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          ></input>
          <button type="button" onClick={sendMessage}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserRequest;
