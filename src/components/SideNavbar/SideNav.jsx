import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png"
import "./SideNav.css";
import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaUserTimes,
  FaClock,
  FaCalendarCheck,
  FaSearch,
  FaDownload,
  FaIdCard,
  FaBell,
  FaCreditCard,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";

const SideNavBar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  /* 🔔 COUNTS (CONTROL BADGES) */
  const [expiringCount, setExpiringCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  const [openMenu, setOpenMenu] = useState({
    members: true,
    attendance: false,
    rfid: false,
  });

  /* 🔹 DEMO VALUES (REPLACE WITH API LATER) */
  // useEffect(() => {
  //   setExpiringCount(12);       // set 0 → badge disappears
  //   setNotificationCount(5);   // set 0 → badge disappears
  // }, []);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  /* AUTO OPEN SUBMENU */
  useEffect(() => {
    if (location.pathname.startsWith("/members")) {
      setOpenMenu((prev) => ({ ...prev, members: true }));
    }
    if (location.pathname.startsWith("/attendance")) {
      setOpenMenu((prev) => ({ ...prev, attendance: true }));
    }
    if (location.pathname.startsWith("/rfid")) {
      setOpenMenu((prev) => ({ ...prev, rfid: true }));
    }
  }, [location.pathname]);

  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={handleNavClick} />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>


        {/* LOGO */}
        <div className="logo">
          <div className="logo-text">
              <h3>THE WELLNESS <img src={logo} alt="The Wellness Club Gym" className="logo-image" />CLUB GYM</h3>
              <span className="tag-color-2 tag-xx">XPRESS</span>
              <p className="logo-tagline">
                <span className="tag-color-1">THE LARGEST</span>{" "}
                <span className="tag-color-2">GYM CHAIN</span>{" "}
                <span className="tag-color-3">IN INDIA</span>
              </p>
              
            </div>
          </div>




        {/* DASHBOARD */}
        <NavLink to="/dashboard" onClick={handleNavClick}
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        {/* MEMBERS */}
        <div className="nav-item" onClick={() => toggleMenu("members")}>
          <FaUsers />
          <span>Members</span>
          <FaChevronDown className={`chevron ${openMenu.members ? "rotate" : ""}`} />
        </div>

        {openMenu.members && (
          <div className="submenu">
            <NavLink to="/members" end onClick={handleNavClick}
              className={({ isActive }) => `submenu-item ${isActive ? "active" : ""}`}>
              <FaUsers /> All Members
            </NavLink>

            <NavLink to="/members/add" onClick={handleNavClick}
              className={({ isActive }) => `submenu-item ${isActive ? "active" : ""}`}>
              <FaUserPlus /> Add New Member
            </NavLink>

            <NavLink to="/members/expired" onClick={handleNavClick}
              className={({ isActive }) => `submenu-item ${isActive ? "active" : ""}`}>
              <FaUserTimes /> Expired Members
            </NavLink>

            <NavLink to="/members/expiring" onClick={handleNavClick}
              className={({ isActive }) => `submenu-item ${isActive ? "active" : ""}`}>
              <FaClock /> Expiring Soon
              {expiringCount > 0 && (
                <span className="count">{expiringCount}</span>
              )}
            </NavLink>
          </div>
        )}

        {/* ATTENDANCE */}
        <div className="nav-item" onClick={() => toggleMenu("attendance")}>
          <FaCalendarCheck />
          <span>Attendance(coming soon)</span>
          {/* <FaChevronDown className={`chevron ${openMenu.attendance ? "rotate" : ""}`} /> */}
        </div>

        {/* {openMenu.attendance && (
          <div className="submenu">
            <NavLink to="/attendance/today" onClick={handleNavClick}
              className={({ isActive }) => `submenu-item ${isActive ? "active" : ""}`}>
              <FaCalendarCheck /> Today’s Attendance
            </NavLink> */}

            {/* <NavLink to="/attendance/search" onClick={handleNavClick}
              className={({ isActive }) => `submenu-item ${isActive ? "active" : ""}`}>
              <FaSearch /> Search Records
            </NavLink> */}

            {/* <NavLink to="/attendance/reports" onClick={handleNavClick}
              className={({ isActive }) => `submenu-item ${isActive ? "active" : ""}`}>
              <FaDownload /> Download Reports
            </NavLink>
          </div>
        )} */}

        {/* MEMBERSHIP */}
        <NavLink to="/plan" onClick={handleNavClick}
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <FaIdCard />
          <span>Membership Plans</span>
        </NavLink>
        <NavLink to="/due" onClick={handleNavClick}
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <FaCreditCard />
          <span>Due Payments</span>
        </NavLink>

        {/* RFID */}
        <div className="nav-item" onClick={() => toggleMenu("rfid")}>
          <FaIdCard />
          <span>RFID Cards (coming soon)</span>
          {/* <FaChevronDown className={`chevron ${openMenu.rfid ? "rotate" : ""}`} /> */}
        </div>

        {/* {openMenu.rfid && (
          <div className="submenu">
            <NavLink to="/rfid" end onClick={handleNavClick}
              className={({ isActive }) => `submenu-item ${isActive ? "active" : ""}`}>
              Card List
            </NavLink>

            <NavLink to="/rfid/replace" onClick={handleNavClick}
              className={({ isActive }) => `submenu-item ${isActive ? "active" : ""}`}>
              Replace Lost Card
            </NavLink>
          </div>
        )} */}

        {/* FOOTER */}
        <div className="nav-footer">
          <NavLink to="/notifications" onClick={handleNavClick}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <FaBell />
            <span>Notifications</span>
            {notificationCount > 0 && (
              <span className="count">{notificationCount}</span>
            )}
          </NavLink>

          <NavLink to="/settings" onClick={handleNavClick}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default SideNavBar;
