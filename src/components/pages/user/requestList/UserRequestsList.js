import { useState, useEffect } from "react";
import "./UserRequestsList.css";
import { Toggle } from "../../../filters/toggle/Toggle";
import { fetchTickets } from "../../../../services/TicketServices";
import { TicketsStructure } from "../../../filters/requestsStructure/TicketsStructure";
import RequestTiles from "../../../requestTile/RequestTiles";
import RequestNotes from "../../../requestNote/RequestNotes";
//import UserRequest from "./request/UserRequest";

function UserTicketsList(props) {
  const [isTicketVisible, setIsTicketVisible] = useState(false);
  const [tickets, setTickets] = useState([]);
  //const [currentTicketId, setCurrentTicketId] = useState(null);
  const [filter, setFilter] = useState({
    status: 5,
  });
  const [listType, setListType] = useState(1);
  const [isTicketChangesSaved, setIsTicketChangesSaved] = useState(false);

  // const inputTicketHandler = (ticketId) => {
  //   setCurrentTicketId(ticketId);
  //   setIsTicketVisible(true);
  // };
  // const cancelTicketHandler = () => {
  //   setIsTicketVisible(false);
  // };
  const hideClosedRequests = (state) => {
    state
      ? setFilter({ ...filter, status: 5 })
      : setFilter({ ...filter, status: null });
  };

  const fetchData = async () => {
    let requests = await fetchTickets(filter);
    setTickets(requests);
    setIsTicketChangesSaved(false);
  };

  useEffect(() => {
    fetchData();
  }, [filter, isTicketChangesSaved]);

  const rerenderList = () => {
    setIsTicketChangesSaved(true);
  };

  let dispBlockStyle = {
    // display: "block",
    width: "100%",
    height: "100%",
  };

  return (
    <div style={dispBlockStyle}>
      {!isTicketVisible && (
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
            <TicketsStructure onSetListType={setListType} />
          </div>
          <div>
            {listType === 1 ? (
              <RequestNotes
                requests={tickets}
                onOpenRequest={props.openRequest}
                // onOpenRequest={(requestId) => inputRequestHandler(requestId)}
              />
            ) : (
              <RequestTiles
                requests={tickets}
                onOpenRequest={props.openRequest}
                //onOpenRequest={(requestId) => inputRequestHandler(requestId)}
              />
            )}
          </div>
        </div>
      )}
      {/* {isRequestVisible && (
        <UserRequest
          onCloseRequest={props.onCloseRequest}
          onSavedChanges={rerenderList}
          id={currentRequestId}
          // title={currentRequest.title}
          // status={currentRequest.status}
        />
      )} */}
    </div>
  );
}

export default UserTicketsList;
