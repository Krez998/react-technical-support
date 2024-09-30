import "./RequestsList.css";
import RequestNote from "../request/RequestNote";

function RequestsList(props) {
    return (
        <ul className="request-list">
            <label>Номер регистрации</label>
            <label>Заголовок</label>
            <label>Дата регистрации</label>
            {props.requests.map((r) => (
                <li key={r.id}>
                    <RequestNote 
                        requestNumber={r.id}
                        title={r.title}
                        registrationDate={r.registrationDate}
                    />
                </li>
            ))}
        </ul>
    );
};

export default RequestsList;