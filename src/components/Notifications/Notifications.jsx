import { useEffect, useState } from "react";
import "./Notifications.css";
import {
  FaBell,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
    fetchStats();
  }, []);

  /* 🔹 FETCH EXPIRY NOTIFICATIONS */
  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/notifications"); // ✅ FIXED
      setNotifications(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(
        "Fetch notifications error:",
        error?.response?.data || error.message
      );
      setNotifications([]);
    }
  };

  /* 🔹 FETCH UNREAD COUNT */
  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get("/notifications/stats");
      setUnreadCount(res.data?.unreadExpiry || 0);
    } catch (error) {
      console.error(
        "Fetch stats error:",
        error?.response?.data || error.message
      );
      setUnreadCount(0);
    }
  };

  /* 🔹 MARK ALL AS READ */
  const markAllAsRead = async () => {
    try {
      await axiosInstance.put("/notifications/read-all"); // ✅ FIXED
      setUnreadCount(0);
      fetchNotifications();
    } catch (error) {
      console.error(
        "Mark all as read error:",
        error?.response?.data || error.message
      );
    }
  };

  return (
    <div className="notifications-page">
      {/* HEADER */}
      <div className="notifications-header">
        <h1>Notifications</h1>

        {unreadCount > 0 && (
          <button className="mark-read-btn" onClick={markAllAsRead}>
            <FaBell /> Mark All as Read
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div className="notif-content">
        <h2>Membership Expiry Alerts</h2>
        <h3>Notifications about expiring and expired memberships</h3>

        {notifications.length === 0 && (
          <p style={{ color: "#aaa", marginTop: "12px" }}>
            No new notifications
          </p>
        )}

        {notifications.map((n) => (
          <div
            key={n._id}
            className={`notif-item ${
              n.subtype === "expired" ? "danger" : "warning"
            }`}
          >
            {n.subtype === "expired" ? (
              <FaTimesCircle />
            ) : (
              <FaExclamationTriangle />
            )}

            <div>
              <strong>
                {n.subtype === "expired"
                  ? "Membership Expired"
                  : "Membership Expiring"}
              </strong>
              <p>{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
