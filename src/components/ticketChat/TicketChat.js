import "./TicketChat.css";
import { useEffect, useState } from "react";
import {
  fetchTicket,
  sendMessage,
  createChat,
} from "../../services/TicketServices";
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
    if (!messageContent.trim()) return;

    let chatId = ticketData?.chatId;

    // если чат в заявке еще не создан
    if (!chatId) {
      chatId = await createChat({ ticketId: ticketData.id });
      setTicketData((prev) => ({ ...prev, chatId: chatId }));
    }

    const response = await sendMessage({
      senderId: userId,
      chatId: chatId,
      content: messageContent,
    });

    const updatedData = await fetchTicket(props.id);
    setTicketData(updatedData);
    response && setMessageContent("");
  };

  // обработка нажатия на Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageHandler();
    }
  };

  if (loading) {
    return <h1>Загрузка...</h1>;
  }

  if (!ticketData) {
    return <div>Нет данных для отображения</div>;
  }

  return (
    <div className="ticket-chat-background">
      <div className="ticket-chat-content-left">
        <button
          className="ticket-chat-content-return-btn"
          type="button"
          onClick={props.onCloseTicket}
        >
          Мои заявки
        </button>
        <ul className="request-chat-message-container">
          {ticketData.messages.map((message) => {
            // console.log(message.senderId);
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
            onKeyDown={handleKeyPress}
          />
          <button type="button" onClick={sendMessageHandler}>
            Отправить
          </button>
        </div>
      </div>
      <div className="ticket-chat-content-right">
        <div className="ticket-chat-info">
          <div className="info-item">
            <span className="title">Заявка&nbsp;</span>
            <span className="value value--first">{ticketData.id}</span>
          </div>
          <div className="info-item">
            <span className="title">Статус</span>
            <span className="value">{ticketStatus}</span>
          </div>
          <div className="info-item">
            <span className="title">Исполнитель</span>
            <span className="value">
              {ticketData.executorFullName == null
                ? "не назначен"
                : ticketData.executorFullName}
            </span>
          </div>
          <div className="info-item">
            <span className="title">Дата и время</span>
            <span className="value">
              {moment(ticketData.createdAt).format("D MMMM YYYY, HH:mm")}
            </span>
          </div>
          <div className="info-item">
            <span className="title">Кем создан</span>
            <span className="value">{ticketData.userFullName}</span>
          </div>
          {/* <div className="info-item">
            <span className="title">Описание</span>
            <span className="value">{ticketData.description}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default TicketChat;
