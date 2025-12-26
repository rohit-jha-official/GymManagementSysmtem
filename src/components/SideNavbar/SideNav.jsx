import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  FaCog,
  FaChevronDown,
} from "react-icons/fa";

const SideNavBar = () => {
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState({
    members: true,
    attendance: false,
    rfid: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  /* ✅ Auto-open submenu based on current route */
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

  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="logo">
        <div className="logo-icon">🏋️</div>
        <div>
          <h3>PowerFit</h3>
          <span>Gym Management</span>
        </div>
      </div>

      {/* DASHBOARD */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `nav-item ${isActive ? "active" : ""}`
        }
      >
        <FaHome />
        <span>Dashboard</span>
      </NavLink>

      {/* MEMBERS */}
      <div className="nav-item" onClick={() => toggleMenu("members")}>
        <FaUsers />
        <span>Members</span>
        <FaChevronDown
          className={`chevron ${openMenu.members ? "rotate" : ""}`}
        />
      </div>

      {openMenu.members && (
        <div className="submenu">
          <NavLink
            to="/members"
            className={({ isActive }) =>
              `submenu-item ${isActive ? "active" : ""}`
            }
          >
            <FaUsers /> All Members
          </NavLink>

          <NavLink
            to="/members/add"
            className={({ isActive }) =>
              `submenu-item ${isActive ? "active" : ""}`
            }
          >
            <FaUserPlus /> Add New Member
          </NavLink>

          <NavLink
            to="/members/expired"
            className={({ isActive }) =>
              `submenu-item ${isActive ? "active" : ""}`
            }
          >
            <FaUserTimes /> Expired Members
          </NavLink>

          <NavLink
            to="/members/expiring"
            className={({ isActive }) =>
              `submenu-item badge ${isActive ? "active" : ""}`
            }
          >
            <FaClock /> Expiring Soon
            <span className="count">12</span>
          </NavLink>
        </div>
      )}

      {/* ATTENDANCE */}
      <div className="nav-item" onClick={() => toggleMenu("attendance")}>
        <FaCalendarCheck />
        <span>Attendance</span>
        <FaChevronDown
          className={`chevron ${openMenu.attendance ? "rotate" : ""}`}
        />
      </div>

      {openMenu.attendance && (
        <div className="submenu">
          <NavLink
            to="/attendance/today"
            className={({ isActive }) =>
              `submenu-item ${isActive ? "active" : ""}`
            }
          >
            <FaCalendarCheck /> Today’s Attendance
          </NavLink>

          <NavLink
            to="/attendance/search"
            className={({ isActive }) =>
              `submenu-item ${isActive ? "active" : ""}`
            }
          >
            <FaSearch /> Search Records
          </NavLink>

          <NavLink
            to="/attendance/reports"
            className={({ isActive }) =>
              `submenu-item ${isActive ? "active" : ""}`
            }
          >
            <FaDownload /> Download Reports
          </NavLink>
        </div>
      )}

      {/* MEMBERSHIP */}
      <NavLink
        to="/plans"
        className={({ isActive }) =>
          `nav-item ${isActive ? "active" : ""}`
        }
      >
        <FaIdCard />
        <span>Membership Plans</span>
      </NavLink>

      {/* RFID */}
      <div className="nav-item" onClick={() => toggleMenu("rfid")}>
        <FaIdCard />
        <span>RFID Cards</span>
        <FaChevronDown
          className={`chevron ${openMenu.rfid ? "rotate" : ""}`}
        />
      </div>

      {openMenu.rfid && (
        <div className="submenu">
          <NavLink
            to="/rfid"
            className={({ isActive }) =>
              `submenu-item ${isActive ? "active" : ""}`
            }
          >
            Card List
          </NavLink>

          <NavLink
            to="/rfid/replace"
            className={({ isActive }) =>
              `submenu-item ${isActive ? "active" : ""}`
            }
          >
            Replace Lost Card
          </NavLink>
        </div>
      )}

      {/* FOOTER */}
      <div className="nav-footer">
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `nav-item badge ${isActive ? "active" : ""}`
          }
        >
          <FaBell />
          <span>Notifications</span>
          <span className="count">5</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default SideNavBar;
