import "../styles/ActionButton.scss";
import { FiChevronRight } from "react-icons/fi";

function ActionButton({ text }) {
  return (
    <div className="actionButton">
      <p>
        {text} <FiChevronRight className="icon" />
      </p>
    </div>
  );
}

export default ActionButton;
