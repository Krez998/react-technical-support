import "./ExecutorPage.css";
import { useState } from "react";
import { fetchRequests } from "../services/RequestServices";
import RequestsList from "../components/requestsList/RequestsList";

function ExecutorPage(props) {

    const [allRequests, setRequests] = useState([]);

    const loadRequests = async () => {
        let requests = await fetchRequests();
        setRequests(requests);
    };         

    return (
        <section>
            <div className="left-menu"> 
                <h2>{props.userData.firstName} {props.userData.lastName} {props.userData.patronymic}</h2>
                <button onClick={loadRequests}>Все заявки</button>
                <button>Инструкции</button>
            </div>
            <div className="main-window">
                <RequestsList requests={allRequests}/>
            </div>
        </section>
    );
};

export default ExecutorPage;