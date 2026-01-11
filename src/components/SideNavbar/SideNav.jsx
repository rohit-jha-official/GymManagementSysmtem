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
import axiosInstance from "../../utils/axiosInstance"; // 🔥 USE JWT CLIENT

const SideNavBar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const [expiringCount, setExpiringCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  const [openMenu, setOpenMenu] = useState({
    members: true,
    attendance: false,
    rfid: false,
  });

  /* 🔔 FETCH COUNTS (JWT BASED) */
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

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  /* AUTO OPEN MEMBERS MENU */
  useEffect(() => {
    if (location.pathname.startsWith("/members")) {
      setOpenMenu((prev) => ({ ...prev, members: true }));
    }
  }, [location.pathname]);

  const handleNavClick = () => setSidebarOpen(false);

  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={handleNavClick} />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* LOGO */}
        <div className="logo">
          <h3>
            THE WELLNESS <img src={logo} alt="Gym" className="logo-image" /> CLUB
          </h3>
          <p className="logo-tagline">THE LARGEST GYM CHAIN IN INDIA</p>
        </div>

        <NavLink to="/dashboard" onClick={handleNavClick} className="nav-item">
          <FaHome /> <span>Dashboard</span>
        </NavLink>

        {/* MEMBERS */}
        <div className="nav-item" onClick={() => toggleMenu("members")}>
          <FaUsers />
          <span>Members</span>
          <FaChevronDown className={`chevron ${openMenu.members ? "rotate" : ""}`} />
        </div>

        {openMenu.members && (
          <div className="submenu">
            <NavLink to="/members" onClick={handleNavClick} className="submenu-item">
              <FaUsers /> All Members
            </NavLink>

            <NavLink to="/members/add" onClick={handleNavClick} className="submenu-item">
              <FaUserPlus /> Add New Member
            </NavLink>

            <NavLink to="/members/expired" onClick={handleNavClick} className="submenu-item">
              <FaUserTimes /> Expired
            </NavLink>

            <NavLink to="/members/expiring" onClick={handleNavClick} className="submenu-item">
              <FaClock /> Expiring Soon
              {expiringCount > 0 && <span className="count">{expiringCount}</span>}
            </NavLink>
          </div>
        )}

        <NavLink to="/plan" onClick={handleNavClick} className="nav-item">
          <FaIdCard /> <span>Membership Plans</span>
        </NavLink>

        <NavLink to="/due" onClick={handleNavClick} className="nav-item">
          <FaCreditCard /> <span>Due Payments</span>
        </NavLink>

        <div className="nav-footer">
          <NavLink to="/notifications" onClick={handleNavClick} className="nav-item">
            <FaBell /> <span>Notifications</span>
            {notificationCount > 0 && <span className="count">{notificationCount}</span>}
          </NavLink>

          <NavLink to="/settings" onClick={handleNavClick} className="nav-item">
            <FaCog /> <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default SideNavBar;
