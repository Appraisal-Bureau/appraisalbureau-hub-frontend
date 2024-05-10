import { FiChevronRight } from 'react-icons/fi';

import './ActionButton.scss';

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
