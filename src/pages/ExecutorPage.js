import "./Page.css";
import { useState } from "react";
import RequestsList from "../components/requestsList/RequestsList";

function ExecutorPage(props) {
  const [isRequestListVisible, setRequestListVisible] = useState(false);

  const showRequestList = () => {
    setRequestListVisible(true);
  };

  return (
    <section>
      <div className="left-menu">
        <h2>
        {props.userData.lastName}&nbsp;
        {props.userData.firstName}&nbsp;
        {props.userData.patronymic}
        </h2>
        <button onClick={showRequestList}>Все заявки</button>
        <button>Инструкции</button>
      </div>
      {isRequestListVisible && (
        <div className="main-window">
          <RequestsList />
        </div>
      )}
    </section>
  );
}

export default ExecutorPage;
