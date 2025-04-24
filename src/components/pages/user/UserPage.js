import "../Page.css";
import CreateNewTicket from "../../newRequest/CreateNewTicket";
import { createTicket } from "../../../services/TicketServices";
import { useState } from "react";
import UserTicketsList from "./ticketsList/UserTicketsList";
import TicketChat from "../../ticketChat/TicketChat";

function UserPage(props) {
  const [isTicketsListVisible, setTicketsListVisible] = useState(true);
  const [isCreateTicketVisible, setCreateTicketFormVisible] = useState(false);
  const [currentTicket, setCurrentTicketData] = useState({
    id: null,
    isVisible: false,
  });

  const showTicketsList = () => {
    setTicketsListVisible(true);
    setCreateTicketFormVisible(false);
    setCurrentTicketData({ ...currentTicket, isVisible: false });
  };

  const showCreateTicketForm = () => {
    setCreateTicketFormVisible(true);
    setTicketsListVisible(false);
    setCurrentTicketData({ ...currentTicket, isVisible: false });
  };

  const showTicketWindow = (ticketId) => {
    setTicketsListVisible(false);
    setCreateTicketFormVisible(false);
    setCurrentTicketData({ ...currentTicket, id: ticketId, isVisible: true });
  };

  const createNewTicket = async (ticket) => {
    await createTicket(ticket);
    showTicketsList();
    // можно обновить список заявок здесь, если это необходимо
  };

  return (
    <div>
      {/* <div className="left-menu">
        <h2>
          {props.userData.lastName}&nbsp;
          {props.userData.firstName}&nbsp;
          {props.userData.patronymic}
        </h2>
        <button onClick={showRequestList}>Мои заявки</button>
        <button onClick={showCreateRequestForm}>Создать заявку</button>
      </div>
      <div className="main-window">
        {isCreateRequestVisible && (
          <CreateNewRequest onCreate={createNewTicket} />
        )}
        {isRequestListVisible && <UserRequestsList />}
      </div> */}
      {isTicketsListVisible && (
        <div>
          <div className="leftside-menu">
            <h2 className="page-title">Личный кабинет</h2>
            <div className="tilebox">
              <h3>
                {props.userData.lastName}&nbsp;
                {props.userData.firstName}&nbsp;
                {props.userData.patronymic}
              </h3>
            </div>
            <div className="tilebox">
              <p>
                Всего заявок: 10<br></br>
                Заявок в архиве: 3
              </p>
            </div>
            <button>Открыть архив</button>
            <button onClick={showCreateTicketForm}>Создать заявку</button>
          </div>
          <div className="content">
            <header>
              <h2 className="content-name">Мои заявки</h2>
            </header>
            <body>
              <UserTicketsList openTicket={showTicketWindow} />
            </body>
          </div>
        </div>
      )}
      {currentTicket.isVisible && (
        <TicketChat onCloseTicket={showTicketsList} id={currentTicket.id} />
      )}
      {isCreateTicketVisible && (
        <CreateNewTicket onClose={showTicketsList} onCreate={createNewTicket} />
      )}
    </div>
  );
}

export default UserPage;
