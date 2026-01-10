import { useEffect, useState } from "react";
import "./Notifications.css";
import {
  FaBell,
  FaExclamationTriangle,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import axios from "axios";
import { API_BASE } from "../../config/api";

const Notifications = () => {
  const [activeTab] = useState("expiry"); // fixed to expiry

  // 🔹 NEW STATES
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
    fetchStats();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_BASE}/notifications/expiry`);
      setNotifications(res.data);
    } catch (error) {
      console.error("Fetch notifications error:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE}/notifications/stats`);
      setUnreadCount(res.data.unreadExpiry);
    } catch (error) {
      console.error("Fetch stats error:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch(`${API_BASE}/notifications/mark-read`);
      setUnreadCount(0);
      fetchNotifications();
    } catch (error) {
      console.error("Mark all as read error:", error);
    }
  };

  return (
    <div className="notifications-page">
      {/* HEADER */}
      <div className="notifications-header">
        <div>
          <h1>Notifications</h1>

          {/* ❌ COMMENTED: View alerts and system logs line */}
          {/*
          <p>View alerts and system logs</p>
          */}
        </div>

        {/* ✅ KEEP THIS BUTTON */}
        <button className="mark-read-btn" onClick={markAllAsRead}>
         <FaBell /> Mark All as Read
        </button>

      </div>

      {/* ❌ COMMENTED: STATS SECTION */}
      {/*
      <div className="notification-stats">
        <div className="notif-card">
          <FaBell className="orange" />
          <div>
            <h2>2</h2>
            <p>Unread Alerts</p>
          </div>
        </div>

        <div className="notif-card">
          <FaExclamationTriangle className="yellow" />
          <div>
            <h2>4</h2>
            <p>Expiry Alerts</p>
          </div>
        </div>

        <div className="notif-card">
          <FaInfoCircle className="blue" />
          <div>
            <h2>6</h2>
            <p>System Logs</p>
          </div>
        </div>
      </div>
      */}

      {/* ❌ COMMENTED: TABS (Expiry Alerts / System Logs toggle) */}
      {/*
      <div className="notif-tabs">
        <button
          className={`notif-tab ${activeTab === "expiry" ? "active" : ""}`}
          onClick={() => setActiveTab("expiry")}
        >
          Expiry Alerts <span className="count">2</span>
        </button>

        <button
          className={`notif-tab ${activeTab === "system" ? "active" : ""}`}
          onClick={() => setActiveTab("system")}
        >
          System Logs
        </button>
      </div>
      */}

      {/* CONTENT */}
      <div className="notif-content">
        {activeTab === "expiry" && (
          <>
            {/* ✅ ONLY THIS SECTION WILL SHOW */}
            <h2>Membership Expiry Alerts</h2>
            <h3>Notifications about expiring and expired memberships</h3>

            {notifications.length === 0 && (
              <p style={{ color: "#aaa", marginTop: "12px" }}>
                No new notifications 🎉
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
          </>
        )}

        {/* ❌ COMMENTED: SYSTEM LOGS CONTENT */}
        {/*
        {activeTab === "system" && (
          <>
            <h2>System Logs</h2>
            <h3>Recent system activities and events</h3>

            <div className="notif-item success">
              <FaCheckCircle />
              <div>
                <strong>Gate Connected</strong>
                <p>Entry gate is now online</p>
                <span>10 minutes ago</span>
              </div>
            </div>

            <div className="notif-item info">
              <FaInfoCircle />
              <div>
                <strong>Backup Complete</strong>
                <p>Daily database backup completed successfully</p>
                <span>2 hours ago</span>
              </div>
            </div>

            <div className="notif-item warning">
              <FaExclamationTriangle />
              <div>
                <strong>Low Storage</strong>
                <p>System storage running low (85% used)</p>
                <span>4 hours ago</span>
              </div>
            </div>

            <div className="notif-item danger">
              <FaTimesCircle />
              <div>
                <strong>Payment Failed</strong>
                <p>Payment processing error for invoice #1234</p>
                <span>1 day ago</span>
              </div>
            </div>
          </>
        )}
        */}
      </div>
    </div>
  );
};

export default Notifications;
