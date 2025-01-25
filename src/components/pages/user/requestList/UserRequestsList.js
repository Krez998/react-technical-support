import { useState, useEffect } from "react";
import "./UserRequestsList.css";
import moment from "moment";
import "moment/locale/ru";
import UserRequest from "./request/UserRequest";
import { Toggle } from "../../../filters/toggle/Toggle";
import { fetchRequests } from "../../../../services/RequestServices";
import RequestNotes from "../../../requestNote/RequestNotes";
import { RequestsStructure } from "../../../filters/requestsStructure/RequestsStructure";
import RequestTiles from "../../../requestTile/RequestTiles";
moment.locale();

function UserRequestsList(props) {
  const [isRequestVisible, setIsRequestVisible] = useState(false);
  const [requests, setRequests] = useState([]);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [filter, setFilter] = useState({
    status: 5,
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
          <div className="user-requests-filter">
            {/* <Toggle label="Сначала новые" toggled={true} onClick={logState} /> */}
            <Toggle
              label="Скрыть закрытые"
              toggled={true}
              onClick={hideClosedRequests}
            />
            {/* <Toggle
              label="Показать неназначенные"
              toggled={filter.isShowNotAssigned}
              onClick={showNotAssignedRequests}
            /> */}
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
        <UserRequest
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

export default UserRequestsList;
