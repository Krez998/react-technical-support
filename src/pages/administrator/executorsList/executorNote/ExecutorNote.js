import { useEffect, useImperativeHandle, useState, forwardRef } from "react";
import "../executorNote/ExecutorNote.css";

const ExecutorNote = forwardRef((props, ref) => {
  
  const [color, setColor] = useState("transparent");
  const handleMouseEnter = (event) => {
    color !== "lightgreen" && setColor("lightblue");
  };
  const handleMouseLeave = (event) => {
    color !== "lightgreen" && setColor("transparent");
  };
  const chooseHandler = () => {
    setColor("lightgreen");
    let fullName = `${props.user.lastName} ${props.user.firstName} ${props.user.patronymic}`;
    props.onChooseExecutor(props.user.id, fullName);
  };

  useImperativeHandle(ref, () => ({
    onSetDefaultColor: (selectedId) => {
      //console.log(`Setting default color for ${props.user.firstName}`);
      if (props.user.id !== selectedId) {
        setColor("transparent");
      }
    },
  }));

  return (
    <div
      className="executor-note"
      onClick={chooseHandler}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: color }}
    >
      <label>
        {props.user.lastName}&nbsp;
        {props.user.firstName}&nbsp;
        {props.user.patronymic}
      </label>
    </div>
  );
});

export default ExecutorNote;
