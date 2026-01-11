import "./topbar.css";
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
import axiosInstance from "../../utils/axiosInstance";
import { searchRoutes } from "../../utils/searchRoutes";

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

  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  /* ⏰ CLOCK */
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* 🔔 NOTIFICATIONS (JWT SAFE) */
  useEffect(() => {
    if (!token) {
      setNotifCount(0);
      return;
    }

    const fetchNotifications = async () => {
      try {
        const res = await axiosInstance.get("/notifications/stats");
        setNotifCount(res.data?.unreadExpiry || 0);
      } catch {
        setNotifCount(0);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [token]);

  /* ❌ CLICK OUTSIDE */
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const date = now.toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login/admin");
  };

  /* SEARCH */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const q = value.toLowerCase();
    const matches = searchRoutes.filter((r) =>
      r.keywords.some((k) => k.toLowerCase().includes(q))
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
      <div className="topbar-left">
        <div className="mobile-menu-btn" onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </div>

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
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="search-item"
                  onClick={() => handleSuggestionClick(s.path)}
                >
                  {s.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-time">
          <span className="time">{time}</span>
          <span className="date">{date}</span>
        </div>

        {isLoggedIn && (
          <div
            className="notification"
            onClick={() => navigate("/notifications")}
          >
            <FaBell />
            {notifCount > 0 && <span className="badge">{notifCount}</span>}
          </div>
        )}

        {isLoggedIn ? (
          <>
            <div className="user-wrapper" ref={profileRef}>
              <div
                className="user-info clickable"
                onClick={() => setOpenProfile(!openProfile)}
              >
                <FaUserCircle />
                <div className="user-text">
                  <div className="user-name">Admin</div>
                  <div className="user-role">Branch Admin</div>
                </div>
                <FaChevronDown />
              </div>

              {openProfile && (
                <div className="user-dropdown">
                  <div onClick={() => navigate("/settings")}>
                    Profile Settings
                  </div>
                </div>
              )}
            </div>

            <div className="login-switch clickable" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </div>
          </>
        ) : (
          <div
            className="login-switch clickable"
            onClick={() => navigate("/login/admin")}
          >
            <FaSignInAlt /> Login
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
