import "../Page.css";
import { useState } from "react";
import AdminRequestsList from "./requestList/AdminRequestsList";
import CreateUser from "./createUser/CreateUser";
import { createUser } from "../../../services/UserServices";

function AdminPage(props) {
  const [isRequestListVisible, setRequestListVisible] = useState(false);
  const [isCreateUserFormVisible, setCreateUserFormVisible] = useState(false);

  const showRequestList = () => {
    setRequestListVisible(true);
    setCreateUserFormVisible(false);
  };

  const showCreateUserForm = () => {
    setCreateUserFormVisible(true);
    setRequestListVisible(false);
  };

  const createUserHandler = async (user) => {
      console.log(user);
      await createUser(user);
      setCreateUserFormVisible(false);
      setRequestListVisible(false);
  };

  return (
    <section>
      
      <div className="left-menu">
        <h2>
          {props.userData.lastName} {props.userData.firstName}{" "}
          {props.userData.patronymic}
        </h2>
        <button type="button" onClick={showRequestList}>Все заявки</button>
        <button type="button" onClick={showCreateUserForm}>Создание пользователей</button>
        <button type="button">Настройка справочников</button>
        <button type="button">Создание отчетов</button>
      </div>
      {isRequestListVisible && (
        <div className="main-window">
          <AdminRequestsList/>
        </div>
      )}
      {isCreateUserFormVisible && (
        <div className="main-window">
          <CreateUser onCreate={createUserHandler}/>
        </div>   
      )}
    </section>
  );
}

export default AdminPage;
