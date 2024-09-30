import "./UserPage.css";
import CreateNewRequest from "../components/newRequest/CreateNewRequest";
import { createRequest } from "../services/RequestServices";
import { useState } from "react";

function UserPage(props) {

    const [isCreateRequestVisible, setCreateRequestFormVisible] = useState(false);

    const showCreateRequestForm = () => {
        setCreateRequestFormVisible(true);
      };

    const createNewRequest = async (request) => {
        await createRequest(request);
    };

    return(
        <section>
            <div className="left-menu">
                <h2>{props.userData.firstName} {props.userData.lastName} {props.userData.patronymic}</h2>
                <button onClick={showCreateRequestForm}>Создать заявку</button>
                <button>Все заявки</button>
                <button>Инструкции</button>
            </div>
            <div className="main-window">
                {isCreateRequestVisible && (
                    <CreateNewRequest onCreate={createNewRequest}

                    />
                
                )}
            </div>
        </section>
    );
};

export default UserPage;