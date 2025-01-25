import "./RequestsStructure.css";
import tableImg from "../../../resources/requestsFilter/table_btn.png";
import tilesImg from "../../../resources/requestsFilter/tiles_btn.png";

export const RequestsStructure = ({ onSetListType }) => {

  return (
    <div class="requests-structure-container">
      <button type="button" onClick={() => onSetListType(1)}>
        <img src={tableImg} alt="Таблица" />
      </button>
      <button type="button" onClick={() => onSetListType(2)}>
        <img src={tilesImg} alt="Плитка" />
      </button>
    </div>
  );
};
