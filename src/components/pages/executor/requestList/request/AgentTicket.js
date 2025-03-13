import { useEffect, useState } from "react";
import "./AgentTicket.css";
import {
  changeTicketStatus,
  fetchTicket,
} from "../../../../../services/TicketServices";

const AgentTicket = (props) => {
  const [isSaveButtonVisible, setSaveButtonVisible] = useState(false);
  const [ticketData, setTicketData] = useState({
    id: props.id,
    title: "",
    agentFullName: "",
    agentId: null,
    status: null,
  });

  const [ticketStatusData, setStatus] = useState({
    id: props.id,
    status: null,
  });

  const fetchData = async () => {
    let response = await fetchTicket(ticketData.id);
    setTicketData({
      ...ticketData,
      title: response.title,
      agentFullName: response.agentFullName,
      agentId: response.agentId,
      status: response.status,
    });
    setStatus({ ...ticketStatusData, status: response.status });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSaveButtonVisible(
      ticketData.status !== ticketStatusData.status
    );
  }, [ticketStatusData, ticketData.status]);

  const patchData = async () => {
    if (ticketData.status !== ticketStatusData.status) {
      let response = await changeTicketStatus(ticketStatusData);
      if (response.status === 200) {
        setTicketData({ ...ticketData, status: response.data.status });
        setStatus({ ...ticketStatusData, status: response.data.status });
      }
    }

    fetchData();
    props.onSavedChanges();
  };

  return (
    <div>
      {
        <div className="ticket">
          <h1>Заявка</h1>
          <label>Номер заявки</label>
          <input readOnly value={ticketData.id}></input>
          <label>Исполнитель</label>
          <input readOnly value={ticketData.agentFullName}></input>
          <label>Заголовок</label>
          <input readOnly value={ticketData.title}></input>
          <label>Статус</label>
          <select
            value={ticketStatusData.status}
            onChange={(e) =>
              setStatus({
                ...ticketStatusData,
                status: Number(e.target.value),
              })
            }
          >
            <option value={0}>Создан</option>
            <option value={1}>Назначен</option>
            <option value={2}>В обработке</option>
            <option value={3}>На удержании</option>
            <option value={4}>Решен</option>
            <option value={5}>Закрыт</option>
            <option value={6}>Переоткрыт</option>
            <option value={7}>Отменен (самим пользователем)</option>
          </select>
          <div>
            <button type="button" onClick={props.onCloseRequest}>
              Назад
            </button>
            {isSaveButtonVisible && (
              <button type="button" onClick={patchData}>
                Сохранить изменения
              </button>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default AgentTicket;
