import { useState, useEffect } from "react";
import "./AdminRequestsList.css";
import moment from "moment";
import "moment/locale/ru";
import Request from "../../../components/requestsList/requestNote/request/Request";
import { Toggle } from "../../../components/toggle/Toggle";
import { fetchRequests } from "../../../services/RequestServices";
import RequestNote from "../../../components/requestsList/requestNote/RequestNote";
moment.locale();

function AdminRequestsList(props) {
  const [isRequestVisible, setIsRequestVisible] = useState(false);
  const [requests, setRequests] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [filter, setFilter] = useState({
    status: 5,
    isShowNotAssigned: false,
  });
  const [isRequestChangesSaved, setIsRequestChangesSaved] = useState(false);

  const inputRequestHandler = (request) => {
    setCurrentRequest(request);
    setIsRequestVisible(true);
  };
  const cancelRequestHandler = () => {
    setIsRequestVisible(false);
  };
  const hideClosedRequests = (state) => {
    state
      ? setFilter({ ...filter, status: 5 })
      : setFilter({ ...filter, status: null });
  };
  const showNotAssignedRequests = (state) => {
    state
      ? setFilter({ ...filter, isShowNotAssigned: true })
      : setFilter({ ...filter, isShowNotAssigned: false });
  };

  const fetchData = async () => {
    let requests = await fetchRequests(filter);
    setRequests(requests);
    setIsRequestChangesSaved(false);
  };

  useEffect(() => {
    fetchData();
  }, [filter, isRequestChangesSaved]);

  const rerenderList = () => {
    setIsRequestChangesSaved(true);
  };

  let dispBlockStyle = {
    // display: "block",
    width: "100%",
    height: "100%",
  };

  return (
    <div style={dispBlockStyle}>
      {!isRequestVisible && (
        <div className="requests-window">
          <div className="request-filter">
            {/* <Toggle label="Сначала новые" toggled={true} onClick={logState} /> */}
            <Toggle
              label="Скрыть закрытые"
              toggled={true}
              onClick={hideClosedRequests}
            />
            <Toggle
              label="Показать неназначенные"
              toggled={filter.isShowNotAssigned}
              onClick={showNotAssignedRequests}
            />
          </div>
          <ul className="request-list">
            <li className="request-list-header">
              <label>Номер регистрации</label>
              <label>Заголовок</label>
            </li>
            {requests.map((r) => (
              <li key={r.id}>
                <RequestNote
                  onOpenRequest={() => inputRequestHandler(r)}
                  status={r.status}
                  requestNumber={r.id}
                  title={r.title}
                  description={r.description}
                  unreadMessages={r.unreadMessages}
                  // registrationDate={moment(r.registrationDate).format("D MMMM YYYY, HH:mm")}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {isRequestVisible && (
        <Request
          onCloseRequest={cancelRequestHandler}
          onSavedChanges={rerenderList}
          id={currentRequest.id}
          // title={currentRequest.title}
          // status={currentRequest.status}
        />
      )}
    </div>
  );
}

export default AdminRequestsList;
