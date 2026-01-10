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
import axios from "axios";
import { API_BASE } from "../../config/api";
import { searchRoutes } from "../../utils/searchRoutes"; // ✅ ADD

const Topbar = ({ toggleSidebar, sidebarOpen }) => {
  const [now, setNow] = useState(new Date());
  const [openProfile, setOpenProfile] = useState(false);
  const [notifCount, setNotifCount] = useState(0);

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  /* ⏰ LIVE TIME */
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* 🔔 FETCH NOTIFICATION COUNT */
  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const res = await axios.get(`${API_BASE}/notifications/stats`);
        setNotifCount(res.data.unreadExpiry || 0);
      } catch (error) {
        console.error("Failed to fetch notification count", error);
      }
    };

    fetchNotificationCount();

    // 🔁 Auto refresh every 30 seconds
    const interval = setInterval(fetchNotificationCount, 30000);
    return () => clearInterval(interval);
  }, []);

  /* ❌ CLOSE PROFILE & SEARCH ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }

      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  /* 🚪 LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login/admin");
  };

  /* 🔍 LIVE SEARCH LOGIC */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const text = value.toLowerCase();

    const matches = searchRoutes.filter((route) =>
      route.keywords.some(
        (keyword) =>
          keyword.toLowerCase().includes(text) ||
          text.includes(keyword.toLowerCase())
      )
    );

    setSuggestions(matches);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (path) => {
    navigate(path);
    setSearch("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        <div className="mobile-menu-btn" onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* 🔍 SEARCH WITH DROPDOWN */}
        <div className="topbar-search" ref={searchRef}>
          <FaSearch className="search-icon" />
          <input
            placeholder="Search members, cards, transactions..."
            value={search}
            onChange={handleSearchChange}
            onFocus={() => search && setShowSuggestions(true)}
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="search-dropdown">
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  className="search-item"
                  onClick={() => handleSuggestionClick(item.path)}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        <div className="topbar-time">
          <span className="time">{time}</span>
          <span className="date">{date}</span>
        </div>

        {/* 🔔 NOTIFICATIONS */}
        <div className="notification" onClick={() => navigate("/notifications")}>
          <FaBell className="bell-icon" />
          {notifCount > 0 && <span className="badge">{notifCount}</span>}
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
                  className={`dropdown-arrow ${openProfile ? "rotate" : ""}`}
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
