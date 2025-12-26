import { useState } from "react";
import "./Notifications.css";
import {
  FaBell,
  FaExclamationTriangle,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("expiry");

  return (
    <div className="notifications-page">
      {/* HEADER */}
      <div className="notifications-header">
        <div>
          <h1>Notifications</h1>
          <p>View alerts and system logs</p>
        </div>

        <button className="mark-read-btn">
          <FaBell /> Mark All as Read
        </button>
      </div>

      {/* STATS */}
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

      {/* SEGMENTED TABS */}
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

      {/* CONTENT */}
      <div className="notif-content">
        {activeTab === "expiry" && (
          <>
            <h2>Membership Expiry Alerts</h2>
            <h3>Notifications about expiring and expired memberships</h3>
            <div className="notif-item warning">
              <FaExclamationTriangle />
              <div>
                <strong>Membership Expiring</strong>
                <p>Rahul Sharma's membership expires in 3 days</p>
                <span>2 hours ago</span>
              </div>
            </div>

            <div className="notif-item warning">
              <FaExclamationTriangle />
              <div>
                <strong>Membership Expiring</strong>
                <p>Priya Patel's membership expires in 5 days</p>
                <span>5 hours ago</span>
              </div>
            </div>

            <div className="notif-item danger">
              <FaTimesCircle />
              <div>
                <strong>Membership Expired</strong>
                <p>Amit Kumar's membership has expired</p>
                <span>1 day ago</span>
              </div>
            </div>
          </>
        )}

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
      </div>
    </div>
  );
};

export default Notifications;
