import ChevronRight from 'assets/icons/ChevronRight.svg';
import { Link, useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import './SidebarItem.scss';

function SidebarItem({ text, icon, linkDestination }) {
  let currentLocation = useLocation().pathname.substring(1);
  const isActive = currentLocation.includes(linkDestination);
  return (
    <div
      data-testid="sidebar-item"
      className={`sidebar-item ${isActive ? 'selected' : ''}`}
    >
      <Link to={linkDestination}>
        <ReactSVG src={icon} className="icon" />
        <span>{text}</span>
        <ReactSVG src={ChevronRight} className="hover-only icon" />
      </Link>
    </div>
  );
}

export default SidebarItem;
