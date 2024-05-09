import "../styles/SidebarItem.scss";
import { FiChevronRight } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";

function SidebarItem({ text, icon, linkDestination }) {
  let currentLocation = useLocation().pathname.substring(1);
  const indexOfSlash = currentLocation.indexOf("/");
  if (indexOfSlash) {
    currentLocation = currentLocation.split("/").pop();
  }
  const isActive = currentLocation === linkDestination;
  return (
    <div className={`sidebar-item ${isActive ? "selected" : ""}`}>
      <Link to={linkDestination}>
        <ReactSVG src={icon} className="icon" />
        <span>{text}</span>
        <FiChevronRight className="hover-only icon" />
      </Link>
    </div>
  );
}

export default SidebarItem;
