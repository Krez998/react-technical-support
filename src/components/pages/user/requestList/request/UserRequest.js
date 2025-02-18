import {
  changeRequestStatus,
  fetchRequest,
} from "../../../../../services/RequestServices";
import { useState } from "react";
import "./UserRequest.css";

function UserRequest(props) {
  return (
    <div className="request-background">
      <div className="request-content">
        <button
          className="request-content-return-btn"
          type="button"
          onClick={props.onCloseRequest}
        >
          Мои заявки
        </button>
        <div className="request-info"></div>
        <div className="request-chat"></div>
        <div className="message-input-container">
          <input placeholder="Введите ваще сообщение..."></input>
          <button type="button">Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default UserRequest;
