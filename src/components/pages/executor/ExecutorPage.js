import "../Page.css";
import { useState } from "react";
import AgentTicketsList from "../executor/requestList/AgentTicketsList";
import AgentTicket from "./requestList/request/AgentTicket";

function ExecutorPage(props) {
  const [isTicketListVisible, setTicketListVisible] = useState(true);
  const [isTicketVisible, setIsTicketVisible] = useState(false);

  const showTicketList = () => {
    setTicketListVisible(true);
  };

  const showTicketWindow = (ticketId) => {
    setIsTicketVisible(true);
    setTicketListVisible(false);
  };

  return (
    // <section>
    //   <div className="left-menu">
    //     <h2>
    //     {props.userData.lastName}&nbsp;
    //     {props.userData.firstName}&nbsp;
    //     {props.userData.patronymic}
    //     </h2>
    //     <button type="button" onClick={showRequestList}>Все заявки</button>
    //     <button type="button">Инструкции</button>
    //   </div>
    //   {isRequestListVisible && (
    //     <div className="main-window">
    //       <ExecutorRequestsList />
    //     </div>
    //   )}
    // </section>
    <div>
      {isTicketListVisible && (
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
                Всего заявок: 150<br></br>
                Заявок в архиве: 180
              </p>
            </div>
            <button>Открыть архив</button>
          </div>

          <div className="content">
            <header>
              <h2 className="content-name">Мои заявки</h2>
            </header>
            <body>
              <AgentTicketsList
                openRequest={showTicketWindow}
                onCloseRequest={() => setTicketListVisible(true)}
              />
            </body>
          </div>
        </div>
      )}
      {isTicketVisible && (
        <AgentTicket
          onCloseRequest={showTicketList}
        />
      )}
    </div>
  );
}

export default ExecutorPage;
