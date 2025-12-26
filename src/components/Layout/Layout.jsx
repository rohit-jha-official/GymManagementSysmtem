import SideNavBar from "../SideNavbar/SideNav";
import Topbar from "../Topbar/Topbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="dashboard">
      <SideNavBar />
      <div className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
