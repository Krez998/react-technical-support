import { useState, useEffect } from "react";
import "./AdminTicketsList.css";
import { Toggle } from "../../../filters/toggle/Toggle";
import { fetchTickets } from "../../../../services/TicketServices";
import { TicketsStructure } from "../../../filters/requestsStructure/TicketsStructure";
import TicketTiles from "../../../requestTile/TicketTiles";
import TicketNotes from "../../../requestNote/TicketNotes";

function AdminTicketsList(props) {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState({
    showClosed: false,
    isShowNotAssigned: false,
  });
  const [listType, setListType] = useState(1);
  const [isTicketChangesSaved, setIsTicketChangesSaved] = useState(false);

  const hideClosedTickets = (state) => {
    state
      ? setFilter({ ...filter, showClosed: false })
      : setFilter({ ...filter, showClosed: true });
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
        <Toggle
          label="Показать неназначенные"
          toggled={filter.isShowNotAssigned}
          onClick={showNotAssignedTickets}
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

  // return (
  //   <div style={dispBlockStyle}>
  //     {!isTicketVisible && (
  //       <div>
  //         <div className="admin-requests-filter">
  //           {/* <Toggle label="Сначала новые" toggled={true} onClick={logState} /> */}
  //           <Toggle
  //             label="Скрыть закрытые"
  //             toggled={true}
  //             onClick={hideClosedTickets}
  //           />
  //           <Toggle
  //             label="Показать неназначенные"
  //             toggled={filter.isShowNotAssigned}
  //             onClick={showNotAssignedTickets}
  //           />
  //           <TicketsStructure onSetListType={setListType} />
  //         </div>
  //         <div>
  //           {listType === 1 ? (
  //             <Legacy_TicketNotes
  //               requests={tickets}
  //               onOpenRequest={(requestId) => inputTicketHandler(requestId)}
  //             />
  //           ) : (
  //             <TicketTiles
  //               requests={tickets}
  //               onOpenRequest={(requestId) => inputTicketHandler(requestId)}
  //             />
  //           )}
  //         </div>
  //       </div>
  //     )}
  //     {isTicketVisible && (
  //       <Legacy_AdminTicket
  //         onCloseRequest={cancelTicketHandler}
  //         onSavedChanges={rerenderList}
  //         id={currentTicketId}
  //         // title={currentRequest.title}
  //         // status={currentRequest.status}
  //       />
  //     )}
  //   </div>
  // );
}

export default AdminTicketsList;
