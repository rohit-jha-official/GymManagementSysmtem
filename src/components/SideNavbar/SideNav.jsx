import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./SideNav.css";
import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaUserTimes,
  FaClock,
  FaCalendarCheck,
  FaIdCard,
  FaBell,
  FaCreditCard,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";

const SideNavBar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  /* COUNTS */
  const [expiringCount, setExpiringCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  const [openMenu, setOpenMenu] = useState({
    members: true,
    attendance: false,
    rfid: false,
  });

  /* FETCH COUNTS */
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [expiringRes, notifRes] = await Promise.all([
          axiosInstance.get("/members/expiring"),
          axiosInstance.get("/notifications/stats"),
        ]);

        const list = Array.isArray(expiringRes.data)
          ? expiringRes.data
          : expiringRes.data.members || [];

        const soon = list.filter(
          (m) => m.daysLeft >= 0 && m.daysLeft <= 5
        );

        setExpiringCount(soon.length);
        setNotificationCount(notifRes.data?.unreadExpiry || 0);
      } catch {
        setExpiringCount(0);
        setNotificationCount(0);
      }
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 30000);
    return () => clearInterval(interval);
  }, []);

  /* AUTO OPEN SUBMENUS */
  useEffect(() => {
    if (location.pathname.startsWith("/members")) {
      setOpenMenu((p) => ({ ...p, members: true }));
    }
    if (location.pathname.startsWith("/attendance")) {
      setOpenMenu((p) => ({ ...p, attendance: true }));
    }
    if (location.pathname.startsWith("/rfid")) {
      setOpenMenu((p) => ({ ...p, rfid: true }));
    }
  }, [location.pathname]);

  const toggleMenu = (menu) =>
    setOpenMenu((p) => ({ ...p, [menu]: !p[menu] }));

  const handleNavClick = () => setSidebarOpen(false);

  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={handleNavClick} />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>

        {/* LOGO */}
        <div className="logo">
          <div className="logo-text">
            <h3>
              THE WELLNESS{" "}
              <img src={logo} alt="Gym" className="logo-image" />CLUB GYM
            </h3>
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
              <FaUserTimes /> Expired
            </NavLink>

            <NavLink to="/members/expiring" onClick={handleNavClick}
              className={({ isActive }) => `submenu-item ${isActive ? "active" : ""}`}>
              <FaClock /> Expiring Soon
              {/* {expiringCount > 0 && <span className="count">{expiringCount}</span>} */}
            </NavLink>
          </div>
        )}

        {/* ATTENDANCE (COMING SOON) */}
        <div className="nav-item">
          <FaCalendarCheck />
          <span>Attendance (coming soon)</span>
        </div>

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

        {/* RFID (COMING SOON) */}
        <div className="nav-item">
          <FaIdCard />
          <span>RFID Cards (coming soon)</span>
        </div>

        {/* FOOTER */}
        <div className="nav-footer">
          <NavLink to="/notifications" onClick={handleNavClick}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <FaBell />
            <span>Notifications</span>
            {/* {notificationCount > 0 && (
              <span className="count">{notificationCount}</span>
            )} */}
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
