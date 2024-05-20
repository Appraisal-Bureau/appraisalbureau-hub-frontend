import Add from 'assets/icons/Add.svg';
import { ReactSVG } from 'react-svg';

import './AddButton.scss';

function AddButton({ text }) {
  return (
    <div className="actionButton addButton">
      <span>
        {text} <ReactSVG src={Add} className="icon" />
      </span>
    </div>
  );
}

export default AddButton;
