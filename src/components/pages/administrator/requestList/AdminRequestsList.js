import { useState, useEffect } from "react";
import "./AdminRequestsList.css";
import moment from "moment";
import "moment/locale/ru";
import AdminRequest from "./request/AdminRequest";
import { Toggle } from "../../../filters/toggle/Toggle";
import { fetchTickets } from "../../../../services/TicketServices";
import { TicketsStructure } from "../../../filters/requestsStructure/TicketsStructure";
import Legacy_TicketNotes from "../../../requestNote/Legacy_RequestNotes";
import RequestTiles from "../../../requestTile/RequestTiles";
moment.locale();

function AdminTicketsList(props) {
  const [isTicketVisible, setIsTicketVisible] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [currentTicketId, setCurrentTicketId] = useState(null);
  const [filter, setFilter] = useState({
    status: 5,
    isShowNotAssigned: false,
  });
  const [listType, setListType] = useState(1);
  const [isTicketChangesSaved, setIsTicketChangesSaved] = useState(false);

  const inputTicketHandler = (ticketId) => {
    setCurrentTicketId(ticketId);
    setIsTicketVisible(true);
  };
  const cancelTicketHandler = () => {
    setIsTicketVisible(false);
  };
  const hideClosedTickets = (state) => {
    state
      ? setFilter({ ...filter, status: 5 })
      : setFilter({ ...filter, status: null });
  };
  const showNotAssignedTickets = (state) => {
    state
      ? setFilter({ ...filter, isShowNotAssigned: true })
      : setFilter({ ...filter, isShowNotAssigned: false });
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
          <div className="admin-requests-filter">
            {/* <Toggle label="Сначала новые" toggled={true} onClick={logState} /> */}
            <Toggle
              label="Скрыть закрытые"
              toggled={true}
              onClick={hideClosedTickets}
            />
            <Toggle
              label="Показать неназначенные"
              toggled={filter.isShowNotAssigned}
              onClick={showNotAssignedTickets}
            />
            <TicketsStructure onSetListType={setListType} />
          </div>
          <div>
            {listType === 1 ? (
              <Legacy_TicketNotes
                requests={tickets}
                onOpenRequest={(requestId) => inputTicketHandler(requestId)}
              />
            ) : (
              <RequestTiles
                requests={tickets}
                onOpenRequest={(requestId) => inputTicketHandler(requestId)}
              />
            )}
          </div>
        </div>
      )}
      {isTicketVisible && (
        <AdminRequest
          onCloseRequest={cancelTicketHandler}
          onSavedChanges={rerenderList}
          id={currentTicketId}
          // title={currentRequest.title}
          // status={currentRequest.status}
        />
      )}
    </div>
  );
}

export default AdminTicketsList;
