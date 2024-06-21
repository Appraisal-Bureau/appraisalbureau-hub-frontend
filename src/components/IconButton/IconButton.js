import { ReactSVG } from 'react-svg';

import './IconButton.scss';

function IconButton({ text, icon, onClick }) {
  return (
    <button className="iconButton" onClick={onClick}>
      {text} <ReactSVG className="button-icon" src={icon} />
    </button>
  );
}

export default IconButton;
