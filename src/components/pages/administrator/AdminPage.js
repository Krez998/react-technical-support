import "../Page.css";
import { useState } from "react";
import CreateUser from "./createUser/CreateUser";
import AdminTicketsList from "./ticketsList/AdminTicketsList";
import TicketChat from "../../ticketChat/TicketChat";

function AdminPage(props) {
  const [isTicketsListVisible, setTicketsListVisible] = useState(true);
  const [isCreateUserFormVisible, setCreateUserFormVisible] = useState(false);
  const [currentTicket, setCurrentTicketData] = useState({
    id: null,
    isVisible: false,
  });

  const showTicketsList = () => {
    setTicketsListVisible(true);
    setCreateUserFormVisible(false);
    setCurrentTicketData({ ...currentTicket, isVisible: false });
  };

  const showCreateUserForm = () => {
    setCreateUserFormVisible(true);
    setTicketsListVisible(false);
    setCurrentTicketData({ ...currentTicket, isVisible: false });
  };

  const showTicketWindow = (ticketId) => {
    setTicketsListVisible(false);
    setCreateUserFormVisible(false);
    setCurrentTicketData({ ...currentTicket, id: ticketId, isVisible: true });
  };

  return (
    <div>
      {/* <div className="left-menu">
        <h2>
          {props.userData.lastName}&nbsp;
          {props.userData.firstName}&nbsp;
          {props.userData.patronymic}
        </h2>
        <button type="button" onClick={showTicketsList}>
          Все заявки
        </button>
        <button type="button" onClick={showCreateUserForm}>
          Создание пользователей
        </button>
        <button type="button">Настройка справочников</button>
        <button type="button">Создание отчетов</button>
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
                Всего заявок: 99<br></br>
                Заявок в архиве: 9
              </p>
            </div>
            <button>Настройка справочников</button>
            <button>Создание отчетов</button>
            <button onClick={showCreateUserForm}>Создать пользователя</button>
          </div>
          <div className="content">
            <header>
              <h2 className="content-name">Мои заявки</h2>
            </header>
            <body>
              <AdminTicketsList openTicket={showTicketWindow} />
            </body>
          </div>
        </div>
      )}
      {currentTicket.isVisible && (
        <TicketChat onCloseTicket={showTicketsList} id={currentTicket.id} />
      )}
      {isCreateUserFormVisible && <CreateUser onClose={showTicketsList} />}
    </div>
  );
}

export default AdminPage;
