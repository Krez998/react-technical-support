import "../../Page.css";
import { useState } from "react";
import AdminRequestsList from "../requestList/AdminRequestsList";

function AdministratorPage(props) {
  const [isRequestListVisible, setRequestListVisible] = useState(false);

  const showRequestList = () => {
    setRequestListVisible(true);
  };

  return (
    <section>
      <div className="left-menu">
        <h2>
          {props.userData.lastName} {props.userData.firstName}{" "}
          {props.userData.patronymic}
        </h2>
        <button onClick={showRequestList}>Все заявки</button>
        <button>Создание пользователей</button>
        <button>Настройка справочников</button>
        <button>Создание отчетов</button>
      </div>
      {isRequestListVisible && (
        <div className="main-window">
          <AdminRequestsList />
        </div>
      )}
    </section>
  );
}

export default AdministratorPage;
