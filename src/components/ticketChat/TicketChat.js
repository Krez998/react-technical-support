import "./TicketChat.css";
import { useEffect, useState, useRef } from "react";
import {
  fetchTicket,
  sendMessage,
  createChat,
  changeTicketStatus,
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

  const messageEndRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchTicket(props.id);
      setTicketData(response);
      setLoading(false);
    };

    loadData();
  }, [props.id]);

  const setStatusButtonHadler = async (e) => {
    try {
      let relustStatus = parseInt(e.target.value);

      if (parseInt(ticketData.status) === relustStatus) return;

      setTicketData((prev) => ({ ...prev, status: relustStatus }));

      await changeTicketStatus({
        id: ticketData.id,
        status: parseInt(relustStatus),
      });
    } catch (e) {}
  };

  useEffect(() => {
    const getStatus = () => {
      switch (ticketData.status) {
        case 0:
          setStatus("Создан");
          return;
        case 1:
          setStatus("Назначен");
          return;
        case 2:
          setStatus("В обработке");
          return;
        case 3:
          setStatus("На удержании");
          return;
        case 4:
          setStatus("Решен");
          return;
        case 5:
          setStatus("Закрыт");
          return;
        case 6:
          setStatus("Переоткрыт");
          return;
        case 7:
          setStatus("Отменен (самим пользователем)");
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

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [ticketData]);

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
          {<div ref={messageEndRef}></div>}
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
              {moment(ticketData.registrationDate).format("D MMMM YYYY, HH:mm")}
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
          {props.userRole !== 0 && (
            <select
              name="statuses"
              id="statusSelector"
              className="ticket-chat-status-select"
              value={ticketData.status}
              onChange={setStatusButtonHadler}
            >
              <option value="0">Создан</option>
              <option value="1">Назначен</option>
              <option value="2">В обработке</option>
              <option value="3">На удержании</option>
              <option value="4">Решен</option>
              <option value="5">Закрыт</option>
              <option value="6">Переоткрыт</option>
              <option value="7">Отменен (самим пользователем)</option>
            </select>
          )}
        </div>

        {/* <div className="ticket-chat-settings"></div> */}
      </div>
    </div>
  );
}

export default TicketChat;
