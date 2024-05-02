import '../styles/SidebarItem.scss';
import {FiChevronRight} from "react-icons/fi";
import {Link} from "react-router-dom";

function SidebarItem({text, icon, className, linkDestination}) {
    const defaultStyle = 'sidebar-item';
    const combinedClassName = className ? `${defaultStyle} ${className}` : defaultStyle;
  
  return (
    <div className={combinedClassName}>
        <Link to={linkDestination}>
            <img src={icon} className="icon" />
            <span>{text}</span>
            <FiChevronRight className="hover-only" />
        </Link>
    </div>
  );
}

export default SidebarItem;
