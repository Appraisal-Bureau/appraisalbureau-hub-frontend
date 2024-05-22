import ChevronRight from 'assets/icons/ChevronRight.svg';
import { ReactSVG } from 'react-svg';

import './ActionButton.scss';

function ActionButton({ text }) {
  return (
    <div className="actionButton">
      <span>
        {text} <ReactSVG src={ChevronRight} className="icon" />
      </span>
    </div>
  );
}

export default ActionButton;
