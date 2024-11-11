import { useEffect, useState } from "react";
import "../request/Request.css";
import {
  changeRequestStatus,
  changeRequestExecutor,
  fetchRequest,
} from "../../../../services/RequestServices";
import ExecutorsList from "../../../../pages/administrator/executorsList/ExecutorsList";

const Request = (props) => {
  const [isSaveButtonVisible, setSaveButtonVisible] = useState(false);
  const [isExecutorsListVisible, setExecutorsListVisible] = useState(false);

  const [requestData, setRequestData] = useState({
    id: props.id,
    title: "",
    executorFullName: "",
    executorId: null,
    status: null,
  });

  const [resuestStatusData, setStatus] = useState({
    id: props.id,
    status: null,
  });

  const [requestExecutorData, setExecutor] = useState({
    id: props.id,
    executorId: null,
    executorFullName: null,
  });

  const fetchData = async () => {
    let response = await fetchRequest(requestData.id);
    setRequestData({
      ...requestData,
      title: response.title,
      executorFullName: response.executorFullName,
      executorId: response.executorId,
      status: response.status,
    });
    setStatus({ ...resuestStatusData, status: response.status });
    setExecutor({ ...requestExecutorData, executorId: response.executorId, executorFullName: response.executorFullName });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSaveButtonVisible(
      requestData.status !== resuestStatusData.status ||
        requestData.executorId !== requestExecutorData.executorId
    );
  }, [resuestStatusData, requestExecutorData, requestData.status]);

  const hideExecutorsListHandler = () => {
    setExecutorsListVisible(false);
  };

  const showExecutorsListHandler = () => {
    setExecutorsListVisible(true);
  };

  let changeExecutorButtonDescription;
  if (requestData.executorFullName === null) {
    changeExecutorButtonDescription = "Назначить исполнителя";
  } else changeExecutorButtonDescription = "Сменить исполнителя";

  const patchData = async () => {

    if (requestData.status !== resuestStatusData.status) {
      let response = await changeRequestStatus(resuestStatusData);
      if (response.status === 200) {
        setRequestData({ ...requestData, status: response.data.status });
        setStatus({ ...resuestStatusData, status: response.data.status });
      }
    }

    if (requestData.executorId !== requestExecutorData.executorId) {
      let response = await changeRequestExecutor(requestExecutorData);
      if (response.status === 200) {
        setRequestData({ ...requestData, status: response.data.status });
        setExecutor({
          ...requestExecutorData,
          executorId: response.data.executorId,
        });
      }
    }

    fetchData();
  };

  const chooseExecutorHandler = (id, fullName) => {
    setExecutorsListVisible(false);
    setExecutor({ ...requestExecutorData, executorId: id, executorFullName: fullName });
  };

  return (
    <div>
      {!isExecutorsListVisible && (
        <div className="request">
          <h1>Заявка</h1>
          <label>Номер заявки</label>
          <input readOnly value={requestData.id}></input>
          <label>Исполнитель</label>
          <input readOnly value={requestExecutorData.executorFullName}></input>
          <label>Заголовок</label>
          <input readOnly value={requestData.title}></input>
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
            <button type="button" onClick={showExecutorsListHandler}>
              {changeExecutorButtonDescription}
            </button>
            {isSaveButtonVisible && (
              <button type="button" onClick={patchData}>
                Сохранить изменения
              </button>
            )}
          </div>
        </div>
      )}
      {isExecutorsListVisible && (
        <ExecutorsList
          onChooseExecutor={chooseExecutorHandler}
          onCloseExecutorsList={hideExecutorsListHandler}
        />
      )}
    </div>
  );
};

export default Request;
