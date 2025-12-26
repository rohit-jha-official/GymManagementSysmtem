import { useState } from "react";
import "./Settings.css";
import {
  FaUser,
  FaKey,
  FaWifi,
  FaEye,
} from "react-icons/fa";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("admin");

  return (
    <div className="settings-page">
      {/* HEADER */}
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account and system settings</p>
      </div>

      {/* TABS */}
      <div className="settings-tabs">
        <button
          className={activeTab === "admin" ? "active" : ""}
          onClick={() => setActiveTab("admin")}
        >
          Admin Account
        </button>
        <button
          className={activeTab === "api" ? "active" : ""}
          onClick={() => setActiveTab("api")}
        >
          API Keys
        </button>
        <button
          className={activeTab === "device" ? "active" : ""}
          onClick={() => setActiveTab("device")}
        >
          Device Status
        </button>
      </div>

      {/* CONTENT CARD */}
      <div className="settings-card">

        {/* ================= ADMIN ACCOUNT ================= */}
        {activeTab === "admin" && (
          <>
            <h2><FaUser /> Admin Account</h2>
            <p className="sub-text">Update your admin account details</p>

            <div className="form-grid">
              <div>
                <label>Full Name</label>
                <input value="Admin User" />
              </div>
              <div>
                <label>Email Address</label>
                <input value="admin@powerfit.com" />
              </div>
              <div>
                <label>Phone Number</label>
                <input value="+91 98765 43210" />
              </div>
              <div>
                <label>Gym Name</label>
                <input value="PowerFit Gym" />
              </div>
            </div>

            <h3>Change Password</h3>
            <div className="form-grid">
              <div>
                <label>Current Password</label>
                <input type="password" />
              </div>
              <div>
                <label>New Password</label>
                <input type="password" />
              </div>
            </div>

            <button className="primary-btn">Save Changes</button>
          </>
        )}

        {/* ================= API KEYS ================= */}
        {activeTab === "api" && (
          <>
            <h2><FaKey /> API Keys</h2>
            <p className="sub-text">Manage API keys for external integrations</p>

            <div className="api-row">
              <label>Gate Controller API Key</label>
              <div className="api-input">
                <input value="••••••••••••••••••••••••" />
                <FaEye />
                <button>Regenerate</button>
              </div>
            </div>

            <div className="api-row">
              <label>SMS Gateway API Key</label>
              <div className="api-input">
                <input value="••••••••••••••" />
                <button>Regenerate</button>
              </div>
            </div>

            <div className="api-row">
              <label>Payment Gateway API Key</label>
              <div className="api-input">
                <input value="••••••••••••••" />
                <button>Regenerate</button>
              </div>
            </div>

            <h3>Webhook Settings</h3>
            <label>Webhook URL</label>
            <input value="https://your-domain.com/webhook" />

            <button className="primary-btn">Save API Settings</button>
          </>
        )}

        {/* ================= DEVICE STATUS ================= */}
        {activeTab === "device" && (
          <>
            <h2><FaWifi /> Device Status</h2>
            <p className="sub-text">Monitor connected devices and their status</p>

            <div className="device-row online">
              <span>Entry Gate</span>
              <span className="status">Online</span>
              <div className="toggle active" />
            </div>

            <div className="device-row online">
              <span>Exit Gate</span>
              <span className="status">Online</span>
              <div className="toggle active" />
            </div>

            <div className="device-row offline">
              <span>Backup Scanner</span>
              <span className="status">Offline</span>
              <div className="toggle" />
            </div>

            <div className="device-row online">
              <span>Attendance Terminal</span>
              <span className="status">Online</span>
              <div className="toggle active" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
