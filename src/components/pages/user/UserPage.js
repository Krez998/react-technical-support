import "../Page.css";
import CreateNewRequest from "../../newRequest/CreateNewRequest";
import { createRequest } from "../../../services/RequestServices";
import { useState } from "react";
import UserRequestsList from "./requestList/UserRequestsList";
import UserRequest from "./requestList/request/UserRequest";

function UserPage(props) {
  const [isRequestListVisible, setRequestListVisible] = useState(true);
  const [isCreateRequestVisible, setCreateRequestFormVisible] = useState(false);
  const [isRequestVisible, setIsRequestVisible] = useState(false);

  const showRequestList = () => {
    setRequestListVisible(true);
    setCreateRequestFormVisible(false);
    setIsRequestVisible(false);
  };

  const showCreateRequestForm = () => {
    setCreateRequestFormVisible(true);
    setRequestListVisible(false);
    setIsRequestVisible(false);
  };

  const showRequestWindow = (requestId) => {
    setIsRequestVisible(true);
    setRequestListVisible(false);
    setCreateRequestFormVisible(false);
  };

  const createNewRequest = async (request) => {
    await createRequest(request);
    showRequestList();
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
        <CreateNewRequest
          onClose={showRequestList}
          onCreate={createNewRequest}
        />
      )}
      {isRequestVisible && (
        <UserRequest
          onCloseRequest={showRequestList}
          // onSavedChanges={rerenderList}
          // id={currentRequestId}
          // title={currentRequest.title}
          // status={currentRequest.status}
        />
      )}
    </div>
  );
}

export default UserPage;
