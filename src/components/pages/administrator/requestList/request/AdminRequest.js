import { useEffect, useState } from "react";
import "./AdminRequest.css";
import {
  changeTicketStatus,
  changeTicketAgent,
  fetchTicket,
} from "../../../../../services/TicketServices";
import AdminExecutorsList from "./executorsList/AdminExecutorsList";

const UserRequest = (props) => {
  const [isSaveButtonVisible, setSaveButtonVisible] = useState(false);
  const [isAgentsListVisible, setAgentsListVisible] = useState(false);

  const [ticketData, setTicketData] = useState({
    id: props.id,
    title: "",
    executorFullName: "",
    agentId: null,
    status: null,
  });

  const [resuestStatusData, setStatus] = useState({
    id: props.id,
    status: null,
  });

  const [ticketAgentData, setAgent] = useState({
    id: props.id,
    agentId: null,
    executorFullName: null,
  });

  const fetchData = async () => {
    let response = await fetchTicket(ticketData.id);
    setTicketData({
      ...ticketData,
      title: response.title,
      executorFullName: response.executorFullName,
      agentId: response.executorId,
      status: response.status,
    });
    setStatus({ ...resuestStatusData, status: response.status });
    setAgent({ ...ticketAgentData, agentId: response.executorId, executorFullName: response.executorFullName });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSaveButtonVisible(
      ticketData.status !== resuestStatusData.status ||
        ticketData.agentId !== ticketAgentData.agentId
    );
  }, [resuestStatusData, ticketAgentData, ticketData.status]);

  const hideExecutorsListHandler = () => {
    setAgentsListVisible(false);
  };

  const showAgentsListHandler = () => {
    setAgentsListVisible(true);
  };

  let changeAgentButtonDescription;
  if (ticketData.executorFullName === null) {
    changeAgentButtonDescription = "Назначить исполнителя";
  } else changeAgentButtonDescription = "Сменить исполнителя";

  const patchData = async () => {

    if (ticketData.status !== resuestStatusData.status) {
      let response = await changeTicketStatus(resuestStatusData);
      if (response.status === 200) {
        setTicketData({ ...ticketData, status: response.data.status });
        setStatus({ ...resuestStatusData, status: response.data.status });
      }
    }

    if (ticketData.agentId !== ticketAgentData.agentId) {
      let response = await changeTicketAgent(ticketAgentData);
      if (response.status === 200) {
        setTicketData({ ...ticketData, status: response.data.status });
        setAgent({
          ...ticketAgentData,
          agentId: response.data.executorId,
        });
      }
    }

    fetchData();
    props.onSavedChanges();
  };

  const chooseAgentsHandler = (id, fullName) => {
    setAgentsListVisible(false);
    setAgent({ ...ticketAgentData, agentId: id, executorFullName: fullName });
  };

  return (
    <div>
      {!isAgentsListVisible && (
        <div className="request">
          <h1>Заявка</h1>
          <label>Номер заявки</label>
          <input readOnly value={ticketData.id}></input>
          <label>Исполнитель</label>
          <input readOnly value={ticketAgentData.executorFullName}></input>
          <label>Заголовок</label>
          <input readOnly value={ticketData.title}></input>
          <label>Статус</label>
          <select
            value={resuestStatusData.status}
            onChange={(e) =>
              setStatus({
                ...resuestStatusData,
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
            <button type="button" onClick={showAgentsListHandler}>
              {changeAgentButtonDescription}
            </button>
            {isSaveButtonVisible && (
              <button type="button" onClick={patchData}>
                Сохранить изменения
              </button>
            )}
          </div>
        </div>
      )}
      {isAgentsListVisible && (
        <AdminExecutorsList
          onChooseExecutor={chooseAgentsHandler}
          onCloseExecutorsList={hideExecutorsListHandler}
        />
      )}
    </div>
  );
};

export default UserRequest;
