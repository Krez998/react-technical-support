import "./TicketChat.css";
import { useEffect, useState } from "react";
import { fetchTicket, sendMessage } from "../../services/TicketServices";
import moment from "moment";
import "moment/locale/ru";
moment.locale();

function TicketChat(props) {
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketStatus, setStatus] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchTicket(props.id);
      setTicketData(response);
      setLoading(false);
    };

    loadData();
  }, [props.id]);

  useEffect(() => {
    const getStatus = () => {
      switch (ticketData.status) {
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
        default:
          setStatus("");
          return;
      }
    };

    if (ticketData) {
      getStatus();
    }
  }, [ticketData]);

  const sendMessageHandler = async () => {
    if (!ticketData.chatId) return; // нельзя отправить сообщение пока не создан чат
    const newMessage = {
      senderId: userId,
      chatId: ticketData.chatId,
      content: messageContent,
    };

    const response = await sendMessage(newMessage);
    const updatedData = await fetchTicket(props.id);
    setTicketData(updatedData);
    response && setMessageContent("");
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!ticketData) {
    return <div>Нет данных для отображения</div>;
  }

  return (
    <div className="ticket-chat-background">
      <div className="ticket-chat-content">
        <button
          className="ticket-chat-content-return-btn"
          type="button"
          onClick={props.onCloseTicket}
        >
          Мои заявки
        </button>
        <div className="ticket-chat-info">
          <div className="ticket-chat-info-first-row">
            <h1>{ticketData.id}</h1>
            <div>
              <p>Статус: {ticketStatus}</p>
              <p>
                Исполнитель:{" "}
                {ticketData.executorFullName == null
                  ? "не назначен"
                  : ticketData.executorFullName}
              </p>
            </div>
            <div>
              <p>
                Дата и время:{" "}
                {moment(ticketData.createdAt).format("D MMMM YYYY, HH:mm")}
              </p>
              <p>Кем создан: {ticketData.userFullName}</p>
            </div>
          </div>
          <div className="ticket-chat-info-second-row">
            <p>{ticketData.description}</p>
          </div>
        </div>
        <ul className="request-chat-message-container">
          {ticketData.messages.map((message) => {
            console.log(typeof message.senderId);
            if (message.senderId === userId) {
              return (
                <li className="ticket-chat-self-message" key={message.id}>
                  <div>{message.content}</div>
                </li>
              );
            } else {
              return (
                <li className="ticket-chat-other-message" key={message.id}>
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
          <button type="button" onClick={sendMessageHandler}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketChat;
