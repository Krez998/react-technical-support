import { useState, useEffect } from "react";
import "./AdminRequestsList.css";
import moment from "moment";
import "moment/locale/ru";
import AdminRequest from "./request/AdminRequest";
import { Toggle } from "../../../filters/toggle/Toggle";
import { fetchRequests } from "../../../../services/RequestServices";
import { RequestsStructure } from "../../../filters/requestsStructure/RequestsStructure";
import RequestNotes from "../../../requestNote/RequestNotes";
import RequestTiles from "../../../requestTile/RequestTiles";
moment.locale();

function AdminRequestsList(props) {
  const [isRequestVisible, setIsRequestVisible] = useState(false);
  const [requests, setRequests] = useState([]);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [filter, setFilter] = useState({
    status: 5,
    isShowNotAssigned: false,
  });
  const [listType, setListType] = useState(1);
  const [isRequestChangesSaved, setIsRequestChangesSaved] = useState(false);

  const inputRequestHandler = (requestId) => {
    setCurrentRequestId(requestId);
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
        <div>
          <div className="admin-requests-filter">
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
            <RequestsStructure onSetListType={setListType} />
          </div>
          <div>
            {listType === 1 ? (
              <RequestNotes
                requests={requests}
                onOpenRequest={(requestId) => inputRequestHandler(requestId)}
              />
            ) : (
              <RequestTiles
                requests={requests}
                onOpenRequest={(requestId) => inputRequestHandler(requestId)}
              />
            )}
          </div>
        </div>
      )}
      {isRequestVisible && (
        <AdminRequest
          onCloseRequest={cancelRequestHandler}
          onSavedChanges={rerenderList}
          id={currentRequestId}
          // title={currentRequest.title}
          // status={currentRequest.status}
        />
      )}
    </div>
  );
}

export default AdminRequestsList;
