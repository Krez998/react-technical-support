import { useEffect, useState, useRef } from "react";
import "./AdminAgentsList.css";
import { fetchExecutors } from "../../../../../../services/UserServices";
import AgentNote from "./agentNote/AgentNote";

const AdminAgentsList = (props) => {
  //const [selectedExecutorId, setSelectedExecutorId] = useState(null);
  const [selectedExecutorData, setSelectedExecutorData] = useState({
    id: null,
    fullName: null,
  });

  const [executors, setExecutors] = useState([]);
  const [isSelectExecutorButtonVisible, setSelectExecutorButtonVisible] =
    useState(false);
  const executorRefs = useRef([]);

  const fetchData = async () => {
    let executors = await fetchExecutors();
    setExecutors(executors);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectExecutorHandler = (id, fullName) => {
    //setSelectedExecutorId(id);
    setSelectedExecutorData({...selectedExecutorData, id: id, fullName: fullName});
    setSelectExecutorButtonVisible(true);

    executorRefs.current.forEach((ref) => {
      if (ref && ref.onSetDefaultColor) {
        ref.onSetDefaultColor(id);
      }
    });
  };

  const selectExecutorButtonHandler = () => {
    //props.onChooseExecutor(selectedExecutorId);
    props.onChooseExecutor(selectedExecutorData.id, selectedExecutorData.fullName);
  };

  return (
    <div className="executors-window">
      <h1>Список исполнителей</h1>
      <ul className="executors-list">
        {executors.map((e, index) => (
          <li key={e.id}>
            <AgentNote
              onChooseExecutor={selectExecutorHandler}
              user={e}
              ref={(el) => (executorRefs.current[index] = el)} // Сохраняем реф
              //isSelected={selectedExecutorId === e.id} // Передаем состояние выбранного исполнителя
            />
          </li>
        ))}
      </ul>
      <button type="button" onClick={props.onCloseExecutorsList}>
        Назад
      </button>
      {isSelectExecutorButtonVisible && (
        <button type="button" onClick={selectExecutorButtonHandler}>
          Выбрать исполнителя
        </button>
      )}
    </div>
  );
};

export default AdminAgentsList;
