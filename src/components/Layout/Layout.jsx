import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "../SideNavbar/SideNav";
import Topbar from "../TopBar/topbar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <SideNavBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN */}
      <div className="dashboard-main">
        <Topbar
          toggleSidebar={() => setSidebarOpen((prev) => !prev)}
          sidebarOpen={sidebarOpen}
        />

        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
