import Add from 'assets/icons/Add.svg';
import { ReactSVG } from 'react-svg';

import './AddButton.scss';

function AddButton({ text }) {
  return (
    <button className="actionButton addButton">
      {text} <ReactSVG className="button-icon" src={Add} />
    </button>
  );
}

export default AddButton;
