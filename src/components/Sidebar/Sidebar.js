import API from 'assets/icons/API.svg';
import Dashboard from 'assets/icons/Dashboard.svg';
import Flow from 'assets/icons/Flow.svg';
import Notifications from 'assets/icons/Notifications.svg';
import Portfolio from 'assets/icons/Portfolio.svg';
import Settings from 'assets/icons/Settings.svg';
import Subscriptions from 'assets/icons/Subscriptions.svg';
import SidebarItem from 'components/Sidebar/SidebarItem/SidebarItem';

import './Sidebar.scss';

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarItem
        text="Dashboard"
        icon={Dashboard}
        linkDestination={'dashboard'}
      />
      <SidebarItem
        text="Portfolio"
        icon={Portfolio}
        linkDestination={'portfolio'}
      />
      <SidebarItem text="Messages" icon={Notifications} />
      <SidebarItem text="Subscriptions" icon={Subscriptions} />
      <SidebarItem text="Workflows" icon={Flow} />
      <div className="bottom-group">
        <hr className="divider" />
        <SidebarItem text="API Keys" icon={API} />
        <SidebarItem text="Settings" icon={Settings} />
      </div>
    </div>
  );
}

export default Sidebar;
