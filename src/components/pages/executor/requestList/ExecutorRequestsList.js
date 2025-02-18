import { useState, useEffect } from "react";
import "./ExecutorRequestsList.css";
import moment from "moment";
import "moment/locale/ru";
import ExecutorRequest from "./request/ExecutorRequest";
import { Toggle } from "../../../filters/toggle/Toggle";
import { fetchRequests } from "../../../../services/RequestServices";
import { RequestsStructure } from "../../../filters/requestsStructure/RequestsStructure";
import Legacy_RequestNotes from "../../../requestNote/Legacy_RequestNotes";
import RequestTiles from "../../../requestTile/RequestTiles";
moment.locale();

function ExecutorRequestsList(props) {
  const [isRequestVisible, setIsRequestVisible] = useState(false);
  const [requests, setRequests] = useState([]);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [toogleFilter, setToogleFilter] = useState({
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
      ? setToogleFilter({ ...toogleFilter, status: 5 })
      : setToogleFilter({ ...toogleFilter, status: null });
  };

  const fetchData = async () => {
    let requests = await fetchRequests(toogleFilter);
    setRequests(requests);
    setIsRequestChangesSaved(false);
  };

  useEffect(() => {
    fetchData();
  }, [toogleFilter, isRequestChangesSaved]);

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
          <div className="executor-requests-filter">
            {/* <Toggle label="Сначала новые" toggled={true} onClick={logState} /> */}
            <Toggle
              label="Скрыть закрытые"
              toggled={true}
              onClick={hideClosedRequests}
            />
            <RequestsStructure onSetListType={setListType} />
          </div>
          <div>
            {listType === 1 ? (
              <Legacy_RequestNotes
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
        <ExecutorRequest
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

export default ExecutorRequestsList;
