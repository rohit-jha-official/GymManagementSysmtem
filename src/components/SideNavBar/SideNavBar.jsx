import React, { useState } from "react";
import "./SideNavBar.css";
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
      <div className="nav-item active">
        <FaHome />
        <span>Dashboard</span>
      </div>

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
          <div className="submenu-item">
            <FaUsers /> All Members
          </div>
          <div className="submenu-item">
            <FaUserPlus /> Add New Member
          </div>
          <div className="submenu-item">
            <FaUserTimes /> Expired Members
          </div>
          <div className="submenu-item badge">
            <FaClock /> Expiring Soon
            <span className="count">12</span>
          </div>
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
          <div className="submenu-item">
            <FaCalendarCheck /> Today’s Attendance
          </div>
          <div className="submenu-item">
            <FaSearch /> Search Records
          </div>
          <div className="submenu-item">
            <FaDownload /> Download Reports
          </div>
        </div>
      )}

      {/* MEMBERSHIP */}
      <div className="nav-item">
        <FaIdCard />
        <span>Membership Plans</span>
      </div>

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
          <div className="submenu-item">Card List</div>
          <div className="submenu-item">Replace Lost Card</div>
        </div>
      )}

      {/* FOOTER */}
      <div className="nav-footer">
        <div className="nav-item badge">
          <FaBell />
          <span>Notifications</span>
          <span className="count">5</span>
        </div>

        <div className="nav-item">
          <FaCog />
          <span>Settings</span>
        </div>
      </div>
    </aside>
  );
};

export default SideNavBar;
