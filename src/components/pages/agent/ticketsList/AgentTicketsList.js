import { useState, useEffect } from "react";
import "./AgentTicketsList.css";
import { Toggle } from "../../../filters/toggle/Toggle";
import { fetchTickets } from "../../../../services/TicketServices";
import { TicketsStructure } from "../../../filters/requestsStructure/TicketsStructure";
import TicketTiles from "../../../requestTile/TicketTiles";
import TicketNotes from "../../../requestNote/TicketNotes";

function AgentTicketsList(props) {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState({
    status: 5,
  });
  const [listType, setListType] = useState(1);
  const [isTicketChangesSaved, setIsTicketChangesSaved] = useState(false);

  const hideClosedTickets = (state) => {
    state
      ? setFilter({ ...filter, status: 5 })
      : setFilter({ ...filter, status: null });
  };

  const fetchData = async () => {
    let tickets = await fetchTickets(filter);
    setTickets(tickets);
    setIsTicketChangesSaved(false);
  };

  useEffect(() => {
    fetchData();
  }, [filter, isTicketChangesSaved]);

  let dispBlockStyle = {
    // display: "block",
    width: "100%",
    height: "100%",
  };

  return (
    <div style={dispBlockStyle}>
      <div className="agent-tickets-filter">
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
          <TicketNotes tickets={tickets} onOpenTicket={props.openTicket} />
        ) : (
          <TicketTiles tickets={tickets} onOpenTicket={props.openTicket} />
        )}
      </div>
    </div>
  );
}

export default AgentTicketsList;
