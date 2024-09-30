import "./RequestNote.css";

function RequestNote({ requestNumber, title, registrationDate }) {
  return (
    <div className="request-note">
      <label>{requestNumber}</label>
      <label>{title}</label>
      <label>{registrationDate}</label>
    </div>
  );
}

export default RequestNote;
