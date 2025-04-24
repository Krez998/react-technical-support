import "./TicketNotes.css";
import moment from "moment";
import "moment/locale/ru";
moment.locale();

function TicketNotes(props) {
  return (
    <div className="ticket-notes">
      {props.tickets.map((ticket) => (
        <li className="ticket-note" key={ticket.id}>
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
