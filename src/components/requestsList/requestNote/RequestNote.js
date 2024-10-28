import "./RequestNote.css";

function RequestNote(props) {
  let backgroundColor;

  switch (props.status) {
    case 0:
      backgroundColor = "rgb(255, 165, 0)";
      break;
    case 2:
      backgroundColor = "green";
      break;
    case 5:
      backgroundColor = "gray";
      break;
    default:
      backgroundColor = "black"; // Цвет по умолчанию
  }

  const labelStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <div className="request-note">
      <div className="request-note-first-column">
        <div className="request-note-status-bar" style={labelStyle} />
      </div>
      <label className="request-note-second-column">
        <a href="#" onClick={props.onOpenRequest}>
          {props.requestNumber}
        </a>
      </label>
      <div className="request-note-third-column">
        <label>{props.title}</label>
        <div>{props.description}</div>
      </div>
      <div className="request-note-fourth-column">
        {props.unreadMessages > 0 && (
          <div className="request-note-unread-messages">
            <div className="request-note-unread-messages-numb">
              {props.unreadMessages}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestNote;
