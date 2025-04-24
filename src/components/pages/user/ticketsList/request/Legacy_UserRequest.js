import { useEffect, useState } from "react";
import "./Legacy_UserRequest.css";
import {
  changeRequestStatus,
  fetchRequest,
} from "../../../../../services/RequestServices";

const Legacy_UserRequest = (props) => {
  const [isSaveButtonVisible, setSaveButtonVisible] = useState(false);
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSaveButtonVisible(
      requestData.status !== resuestStatusData.status
    );
  }, [resuestStatusData, requestData.status]);

  const patchData = async () => {
    if (requestData.status !== resuestStatusData.status) {
      let response = await changeRequestStatus(resuestStatusData);
      if (response.status === 200) {
        setRequestData({ ...requestData, status: response.data.status });
        setStatus({ ...resuestStatusData, status: response.data.status });
      }
    }

    fetchData();
    props.onSavedChanges();
  };

  return (
    <div>
      {
        <div className="request">
          <h1>Заявка</h1>
          <label>Номер заявки</label>
          <input readOnly value={requestData.id}></input>
          <label>Исполнитель</label>
          <input readOnly value={requestData.executorFullName}></input>
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

export default Legacy_UserRequest;
