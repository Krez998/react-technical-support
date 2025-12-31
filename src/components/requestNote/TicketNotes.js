import "./TicketNotes.css";
import moment from "moment";
import "moment/locale/ru";
moment.locale();

const getStatusStyle = (status) => {
  let backgroundColor;
  switch (status) {
    case 1:
      backgroundColor = "orange";
      break;
    case 4:
      backgroundColor = "rgb(6, 182, 6)";
      break;
    case 5:
      backgroundColor = "gray";
      break;
    default:
      backgroundColor = "gray"; // Цвет по умолчанию
  }

  let labelStyle = {
    backgroundColor: backgroundColor,
  };

  return labelStyle;
};

function TicketNotes(props) {
  return (
    <div className="ticket-notes">
      {props.tickets.map((ticket) => (
        <li className="ticket-note" key={ticket.id}>
          <div
            style={getStatusStyle(ticket.status)}
            className="ticket-note-status-color"
          ></div>
          <div
            className="ticket-note-first-column"
            onClick={() => props.onOpenTicket(ticket.id)}
          >
            <h2>{ticket.id}</h2>
            <p>{ticket.description}</p>
          </div>
          <div className="ticket-note-second-column">
            <p>
              {moment(ticket.registrationDate).format("D MMMM YYYY, HH:mm")}
            </p>
          </div>
          {ticket.unreadMessages > 0 && (
            <div className="ticket-note-unread-messages">
              {ticket.unreadMessages}
            </div>
          )}
        </li>
      ))}
    </div>
  );
}

export default TicketNotes;
