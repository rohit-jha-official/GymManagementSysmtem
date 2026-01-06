import "./Topbar.css";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaChevronDown,
  FaSignOutAlt,
  FaSignInAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = ({ toggleSidebar, sidebarOpen }) => {
  const [now, setNow] = useState(new Date());
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  /* ✅ TOKEN-BASED LOGIN CHECK */
  const isLoggedIn = !!localStorage.getItem("token");

  /* LIVE TIME */
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* CLOSE PROFILE DROPDOWN ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const time = now
    .toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    .toUpperCase();

  const date = now.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login/admin");
  };

  return (
    <div className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        <div className="mobile-menu-btn" onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className="topbar-search">
          <FaSearch className="search-icon" />
          <input placeholder="Search members, cards, transactions..." />
        </div>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        <div className="topbar-time">
          <span className="time">{time}</span>
          <span className="date">{date}</span>
        </div>

        <div
          className="notification"
          onClick={() => navigate("/notifications")}
        >
          <FaBell />
          <span className="badge">5</span>
        </div>

        {isLoggedIn ? (
          <>
            {/* PROFILE */}
            <div className="user-wrapper" ref={profileRef}>
              <div
                className="user-info clickable"
                onClick={() => setOpenProfile(!openProfile)}
              >
                <FaUserCircle className="user-icon" />
                <div className="user-text">
                  <div className="user-name">Admin</div>
                  <div className="user-role">Super Admin</div>
                </div>
                <FaChevronDown
                  className={`dropdown-arrow ${
                    openProfile ? "rotate" : ""
                  }`}
                />
              </div>

              {openProfile && (
                <div className="user-dropdown">
                  <div
                    className="dropdown-item"
                    onClick={() => navigate("/settings")}
                  >
                    Profile Settings
                  </div>
                </div>
              )}
            </div>

            {/* LOGOUT */}
            <div className="login-switch clickable" onClick={handleLogout}>
              <FaSignOutAlt />
              <span className="login-text">Logout</span>
            </div>
          </>
        ) : (
          /* LOGIN */
          <div
            className="login-switch clickable"
            onClick={() => navigate("/login/admin")}
          >
            <FaSignInAlt />
            <span className="login-text">Login</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
