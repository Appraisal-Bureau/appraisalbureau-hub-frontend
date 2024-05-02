import "../styles/Sidebar.scss";
import Dashboard from "../assets/icons/Dashboard.svg";
import Portfolio from "../assets/icons/Portfolio.svg";
import Notifications from "../assets/icons/Notifications.svg";
import Subscriptions from "../assets/icons/Subscriptions.svg";
import Flow from "../assets/icons/Flow.svg";
import SidebarItem from "../components/SidebarItem";

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarItem
        className="selected"
        text="Dashboard"
        icon={Dashboard}
        linkDestination={"dashboard"}
      />
      <SidebarItem
        text="Portfolio"
        icon={Portfolio}
        linkDestination={"portfolio"}
      />
      <SidebarItem text="Messages" icon={Notifications} />
      <SidebarItem text="Subscriptions" icon={Subscriptions} />
      <SidebarItem text="Workflows" icon={Flow} />
    </div>
  );
}

export default Sidebar;
