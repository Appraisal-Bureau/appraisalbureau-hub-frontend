import Add from 'assets/icons/Add.svg';
import { ReactSVG } from 'react-svg';

import './AddButton.scss';

function AddButton({ text }) {
  return (
    <button className="actionButton addButton">
      {text} <ReactSVG src={Add} className="icon" />
    </button>
  );
}

export default AddButton;
