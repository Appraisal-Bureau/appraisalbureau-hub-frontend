import "../styles/AddButton.scss";
import { FiPlus } from "react-icons/fi";

function AddButton({ text }) {
  return (
    <div className="actionButton addButton">
      <p>
        {text} <FiPlus className="icon" />
      </p>
    </div>
  );
}

export default AddButton;
