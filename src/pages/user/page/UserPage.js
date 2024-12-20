import "../../Page.css";
import CreateNewRequest from "../../../components/newRequest/CreateNewRequest";
import { createRequest } from "../../../services/RequestServices";
import { useState } from "react";
import UserRequestsList from "../requestList/UserRequestsList";

function UserPage(props) {
  const [isRequestListVisible, setRequestListVisible] = useState(false);
  const [isCreateRequestVisible, setCreateRequestFormVisible] = useState(false);

  const showRequestList = () => {
    setRequestListVisible(true);
    setCreateRequestFormVisible(false);
  };

  const showCreateRequestForm = () => {
    setCreateRequestFormVisible(true);
    setRequestListVisible(false);
  };

  const createNewRequest = async (request) => {
    await createRequest(request);
    setCreateRequestFormVisible(false);
    // можно обновить список заявок здесь, если это необходимо
  };

  return (
    <div>
      <div className="left-menu">
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
      </div>
    </div>
  );
}

export default UserPage;
