import "./Topbar.css";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="topbar">
      {/* LEFT: Search */}
      <div className="topbar-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search members, cards, transactions..."
        />
      </div>

      {/* RIGHT: Time, Notification, User */}
      <div className="topbar-right">
        <div className="topbar-time">
          <span className="time">06:38:54 PM</span>
          <span className="date">Thursday, December 25, 2025</span>
        </div>

        <div className="notification">
          <FaBell />
          <span className="badge">5</span>
        </div>

        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <div>
            <div className="user-name">Admin</div>
            <div className="user-role">Super Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
