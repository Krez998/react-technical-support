import "./RequestNotes.css";
import moment from "moment";
import "moment/locale/ru";
moment.locale();

function RequestNotes(props) {
  return (
    <div className="request-notes">
      {props.requests.map((request) => (
        <li className="request-note" key={request.id}>
          <div
            className="request-note-first-column"
            onClick={() => props.onOpenRequest(request.id)}
          >
            <h2>{request.id}</h2>
            <p>{request.description}</p>
          </div>
          <div className="request-note-second-column">
            <p>
              {moment(request.registrationDate).format("D MMMM YYYY, HH:mm")}
            </p>
          </div>
          {request.unreadMessages > 0 && (
            <div className="request-note-unread-messages">
              {request.unreadMessages}
            </div>
          )}
        </li>
      ))}
    </div>
  );
}

export default RequestNotes;
