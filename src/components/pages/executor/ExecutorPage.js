import "../Page.css";
import { useState } from "react";
import ExecutorRequestsList from "../executor/requestList/ExecutorRequestsList";
import ExecutorRequest from "./requestList/request/ExecutorRequest";

function ExecutorPage(props) {
  const [isRequestListVisible, setRequestListVisible] = useState(true);
  const [isRequestVisible, setIsRequestVisible] = useState(false);

  const showRequestList = () => {
    setRequestListVisible(true);
  };

  const showRequestWindow = (requestId) => {
    setIsRequestVisible(true);
    setRequestListVisible(false);
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
              <ExecutorRequestsList
                openRequest={showRequestWindow}
                onCloseRequest={() => setRequestListVisible(true)}
              />
            </body>
          </div>
        </div>
      )}
      {isRequestVisible && (
        <ExecutorRequest
          onCloseRequest={showRequestList}
        />
      )}
    </div>
  );
}

export default ExecutorPage;
