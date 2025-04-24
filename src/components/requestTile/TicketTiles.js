import "./TicketTiles.css";

function TicketTiles(props) {
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
        {props.tickets.map((ticket) => (
          <div
            className="tile"
            key={ticket.id}
            onClick={() => props.onOpenTicket(ticket.id)}
          >
            {ticket.unreadMessages > 0 && (
              <div className="tile-unread-messages">
                {ticket.unreadMessages}
              </div>
            )}
            <h1 className="tile-id">{ticket.id}</h1>
            <h4 className="tile-title">{ticket.title}</h4>
            <strong>Статус: {getStatusInfo(ticket.status)}</strong>
            <p className="tile-description">{ticket.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketTiles;
