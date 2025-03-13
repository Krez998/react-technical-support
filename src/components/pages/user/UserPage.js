import "../Page.css";
import CreateNewTicket from "../../newRequest/CreateNewTicket";
import { createTicket } from "../../../services/TicketServices";
import { useState } from "react";
import UserRequestsList from "./requestList/UserRequestsList";
import UserRequest from "./requestList/request/UserRequest";

function UserPage(props) {
  const [isRequestListVisible, setRequestListVisible] = useState(true);
  const [isCreateRequestVisible, setCreateRequestFormVisible] = useState(false);
  const [currentRequest, setCurrentRequestData] = useState({
    id: null,
    isVisible: false
  });

  const showTicketsList = () => {
    setRequestListVisible(true);
    setCreateRequestFormVisible(false);
    setCurrentRequestData({...currentRequest, isVisible: false});
  };

  const showCreateRequestForm = () => {
    setCreateRequestFormVisible(true);
    setRequestListVisible(false);
    setCurrentRequestData({...currentRequest, isVisible: false});
  };

  const showRequestWindow = (requestId) => {
    setRequestListVisible(false);
    setCreateRequestFormVisible(false);
    setCurrentRequestData({...currentRequest, id: requestId, isVisible: true});
  };

  const createNewRequest = async (ticket) => {
    await createTicket(ticket);
    showTicketsList();
    // можно обновить список заявок здесь, если это необходимо
  };

  let style = {
    backgroundColor: "gray",
    width: "100%",
    height: "100%",
    position: "absolute",
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
          <CreateNewRequest onCreate={createNewRequest} />
        )}
        {isRequestListVisible && <UserRequestsList />}
      </div> */}
      {isRequestListVisible && (
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
            <button onClick={showCreateRequestForm}>Создать заявку</button>
          </div>

          <div className="content">
            <header>
              <h2 className="content-name">Мои заявки</h2>
            </header>
            <body>
              <UserRequestsList
                openRequest={showRequestWindow}
                onCloseRequest={() => setRequestListVisible(true)}
              />
            </body>
          </div>
        </div>
      )}
      {isCreateRequestVisible && (
        <CreateNewTicket
          onClose={showTicketsList}
          onCreate={createNewRequest}
        />
      )}
      {currentRequest.isVisible && (
        <UserRequest
          onCloseRequest={showTicketsList}
          // onSavedChanges={rerenderList}
          id={currentRequest.id}
          // title={currentRequest.title}
          // status={currentRequest.status}

        />
      )}
    </div>
  );
}

export default UserPage;
