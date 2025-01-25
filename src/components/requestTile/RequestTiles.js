import "./RequestTiles.css";

function RequestTiles(props) {
  const getStatusInfo = (status) => {
    let info = null;
    switch (status) {
      case 0:
        info = "Создан";
        break;
      case 1:
        info = "Назначен";
        break;
      case 2:
        info = "В обработке";
        break;
      case 3:
        info = "На удержании";
        break;
      case 4:
        info = "Решен";
        break;
      case 5:
        info = "Закрыт";
        break;
      case 6:
        info = "Переоткрыт";
        break;
      case 7:
        info = "Отменен (самим пользователем)";
        break;
    }
    return info;
  };

  return (
    <div className="container">
      <div className="grid">
        {props.requests.map((request) => (
          <div
            className="tile"
            key={request.id}
            onClick={() => props.onOpenRequest(request.id)}
          >
            {request.unreadMessages > 0 && (
              <div className="tile-unread-messages">
                {request.unreadMessages}
              </div>
            )}
            <h1 className="tile-id">{request.id}</h1>
            <h4 className="tile-title">{request.title}</h4>
            <strong>Статус: {getStatusInfo(request.status)}</strong>
            <p className="tile-description">{request.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestTiles;
