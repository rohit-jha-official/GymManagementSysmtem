import { useState } from "react";
import "./Settings.css";
import { FaUser, FaKey, FaWifi, FaEye } from "react-icons/fa";
import { MdWifiOff } from "react-icons/md";
import {  FaEyeSlash } from "react-icons/fa";


const Settings = () => {
  const [activeTab, setActiveTab] = useState("device");
  const [showGateKey, setShowGateKey] = useState(false);

  const [devices, setDevices] = useState([
    {
      name: "Entry Gate",
      desc: "Main entrance RFID scanner",
      online: true,
    },
    {
      name: "Exit Gate",
      desc: "Exit door RFID scanner",
      online: true,
    },
    {
      name: "Backup Scanner",
      desc: "Secondary RFID device",
      online: false,
    },
    {
      name: "Attendance Terminal",
      desc: "Reception check-in device",
      online: true,
    },
  ]);

  const toggleDevice = (index) => {
    const updated = [...devices];
    updated[index].online = !updated[index].online;
    setDevices(updated);
  };

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

            {/* Gate Controller */}
            <div className="api-row">
              <label>Gate Controller API Key</label>

              <div className="api-inline">
                                <div className="api-input-wrapper">
                  <input
                    type={showGateKey ? "text" : "password"}
                    value="sk_live_xxxxxxxxxxxxxxxxxxxxx"
                    readOnly
                    className={showGateKey ? "active-input" : ""}
                  />
                <button
                  type="button"
                  className={`eye-btn ${showGateKey ? "active" : ""}`}
                  onClick={() => setShowGateKey(!showGateKey)}
                >
                  {showGateKey ? <FaEyeSlash /> : <FaEye />}
                </button>

                </div>


                <button className="regen-btn">Regenerate</button>
              </div>
            </div>

            {/* SMS Gateway */}
            <div className="api-row">
              <label>SMS Gateway API Key</label>
              <div className="api-inline">
                <input type="password" value="••••••••••••••" readOnly />
                <button className="regen-btn">Regenerate</button>
              </div>
            </div>

            {/* Payment Gateway */}
            <div className="api-row">
              <label>Payment Gateway API Key</label>
              <div className="api-inline">
                <input type="password" value="••••••••••••••" readOnly />
                <button className="regen-btn">Regenerate</button>
              </div>
            </div>

            <h3>Webhook Settings</h3>
            <label>Webhook URL</label>
            <input value="https://your-domain.com/webhook" />

            <button className="primary-btn">Save API Settings</button>
          </>
        )}

        
        {activeTab === "device" && (
          <>
            <h2> Device Status</h2>
            <p className="sub-text">
              Monitor connected devices and their status
            </p>

            {devices.map((device, index) => (
              <div className="device-row" key={index}>
                {/* ICON */}
                <div
                  className={`device-icon ${
                    device.online ? "online" : "offline"
                  }`}
                >
                  {device.online ? <FaWifi /> : <MdWifiOff />}
                </div>

                {/* INFO */}
                <div className="device-info">
                  <strong>{device.name}</strong>
                  <span>{device.desc}</span>
                </div>

                {/* RIGHT */}
                <div className="device-right">
                  <span
                    className={`status-pill ${
                      device.online ? "online" : "offline"
                    }`}
                  >
                    {device.online ? "Online" : "Offline"}
                  </span>

                  <div
                    className={`toggle ${device.online ? "active" : ""}`}
                    onClick={() => toggleDevice(index)}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
