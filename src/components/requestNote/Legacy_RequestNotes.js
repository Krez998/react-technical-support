import "./Legacy_RequestNotes.css";

function Legacy_RequestNotes(props) {
  const getStatusStyle = (status) => {
    let backgroundColor;
    switch (status) {
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

    let labelStyle = {
      backgroundColor: backgroundColor,
    };

    return labelStyle;
  };

  return (
    <ul className="request-notes">
      <li className="request-note-header">
        <div className="request-note-header-first-column"></div>
        <label className="request-note-header-second-column">Номер регистрации</label>
        <label className="request-note-header-third-column">Заголовок</label>
      </li>
      {props.requests.map((request) => (
        <li className="request-note" key={request.id}>
          <div className="request-note-first-column">
            <div
              className="request-note-status-bar"
              style={getStatusStyle(request.status)}
            />
          </div>
          <label className="request-note-second-column">
            <a href="#" onClick={() => props.onOpenRequest(request.id)}>
              {request.id}
            </a>
          </label>
          <div className="request-note-third-column">
            <label>{request.title}</label>
            <div>{request.description}</div>
          </div>
          <div className="request-note-fourth-column">
            {request.unreadMessages > 0 && (
              <div className="request-note-unread-messages">
                <div className="request-note-unread-messages-numb">
                  {request.unreadMessages}
                </div>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Legacy_RequestNotes;
