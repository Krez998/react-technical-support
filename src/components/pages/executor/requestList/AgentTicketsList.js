import { useState, useEffect } from "react";
import "./AgentTicketsList.css";
import moment from "moment";
import "moment/locale/ru";
import AgentTicket from "./request/AgentTicket";
import { Toggle } from "../../../filters/toggle/Toggle";
import { fetchTickets } from "../../../../services/TicketServices";
import { TicketsStructure } from "../../../filters/requestsStructure/TicketsStructure";
import Legacy_RequestNotes from "../../../requestNote/Legacy_RequestNotes";
import RequestTiles from "../../../requestTile/RequestTiles";
moment.locale();

function AgentTicketsList(props) {
  const [isTicketVisible, setIsTicketVisible] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [currentTicketId, setCurrentTicketId] = useState(null);
  const [toogleFilter, setToogleFilter] = useState({
    status: 5,
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
      ? setToogleFilter({ ...toogleFilter, status: 5 })
      : setToogleFilter({ ...toogleFilter, status: null });
  };

  const fetchData = async () => {
    let tickets = await fetchTickets(toogleFilter);
    setTickets(tickets);
    setIsTicketChangesSaved(false);
  };

  useEffect(() => {
    fetchData();
  }, [toogleFilter, isTicketChangesSaved]);

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
          <div className="executor-tickets-filter">
            {/* <Toggle label="Сначала новые" toggled={true} onClick={logState} /> */}
            <Toggle
              label="Скрыть закрытые"
              toggled={true}
              onClick={hideClosedTickets}
            />
            <TicketsStructure onSetListType={setListType} />
          </div>
          <div>
            {listType === 1 ? (
              <Legacy_RequestNotes
                tickets={tickets}
                onOpenTicket={(ticketId) => inputTicketHandler(ticketId)}
              />
            ) : (
              <RequestTiles
                tickets={tickets}
                onOpenTicket={(ticketId) => inputTicketHandler(ticketId)}
              />
            )}
          </div>
        </div>
      )}
      {isTicketVisible && (
        <AgentTicket
          onCloseRequest={cancelTicketHandler}
          onSavedChanges={rerenderList}
          id={currentTicketId}
          // title={currentTicketId.title}
          // status={currentTicketId.status}
        />
      )}
    </div>
  );
}

export default AgentTicketsList;
