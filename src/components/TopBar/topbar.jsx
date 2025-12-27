import "./Topbar.css";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const Topbar = () => {
  const [now, setNow] = useState(new Date());
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const date = now.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="topbar">
      {/* LEFT */}
      <div className="topbar-search">
        <FaSearch className="search-icon" />
        <input placeholder="Search members, cards, transactions..." />
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        <div className="topbar-time">
          <span className="time">{time}</span>
          <span className="date">{date}</span>
        </div>

        {/* NOTIFICATION */}
        <div
          className="notification"
          onClick={() => navigate("/notifications")}
        >
          <FaBell />
          <span className="badge">5</span>
        </div>

        {/* USER DROPDOWN */}
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
      </div>
    </div>
  );
};

export default Topbar;
