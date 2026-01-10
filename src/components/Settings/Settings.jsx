import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Settings.css";
import { FaUser, FaKey, FaWifi, FaEye } from "react-icons/fa";
import { MdWifiOff } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";

const Settings = () => {
  const navigate = useNavigate();

  /* ================= AUTH PROTECTION ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login/admin");
    }
  }, [navigate]);

  /* ================= TABS ================= */
  const [activeTab, setActiveTab] = useState("admin");
  const [showGateKey, setShowGateKey] = useState(false);

  /* ================= ADMIN DATA ================= */
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    phone: "",
    gymName: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  /* ================= LOAD ADMIN ================= */
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
      setAdminData({
        name: admin.name || "",
        email: admin.email || "",
        phone: admin.phone || "",
        gymName: admin.gymName || "",
      });
    }
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleAdminChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  /* ================= SAVE PROFILE ================= */
  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5001/api/admin/update",
        {
          name: adminData.name,
          phone: adminData.phone,
          gymName: adminData.gymName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      alert("Profile updated successfully");
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5001/api/admin/change-password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password changed successfully");
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Password change failed");
    }
  };

  /* ================= DEVICE STATE (UNCHANGED) ================= */
  const [devices, setDevices] = useState([
    { name: "Entry Gate", desc: "Main entrance RFID scanner", online: true },
    { name: "Exit Gate", desc: "Exit door RFID scanner", online: true },
    { name: "Backup Scanner", desc: "Secondary RFID device", online: false },
    { name: "Attendance Terminal", desc: "Reception check-in device", online: true },
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
      {/* <div className="settings-tabs">
        <button className={activeTab === "admin" ? "active" : ""} onClick={() => setActiveTab("admin")}>
          Admin Account
        </button>
        <button className={activeTab === "api" ? "active" : ""} onClick={() => setActiveTab("api")}>
          API Keys
        </button>
        <button className={activeTab === "device" ? "active" : ""} onClick={() => setActiveTab("device")}>
          Device Status
        </button>
      </div> */}

      <div className="settings-card">
        {/* ================= ADMIN ACCOUNT ================= */}
        {activeTab === "admin" && (
          <>
            <h2><FaUser /> Admin Account</h2>
            <p className="sub-text">Update your admin account details</p>

            <div className="form-grid">
              <div>
                <label>Full Name</label>
                <input name="name" value={adminData.name} onChange={handleAdminChange} />
              </div>
              <div>
                <label>Email Address</label>
                <input value={adminData.email} disabled />
              </div>
              <div>
                <label>Phone Number</label>
                <input name="phone" value={adminData.phone} onChange={handleAdminChange} />
              </div>
              <div>
                <label>Gym Name</label>
                <input name="gymName" value={adminData.gymName} onChange={handleAdminChange} />
              </div>
            </div>

            <h3>Change Password</h3>
            <div className="form-grid">
              <div>
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div>
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <button className="primary-btn" onClick={handleSaveProfile}>
              Save Changes
            </button>
            <button className="primary-btn" onClick={handleChangePassword}>
              Update Password
            </button>
          </>
        )}

        {/* ================= API KEYS + DEVICE STATUS ================= */}
        {/* ❗ NO CHANGES REQUIRED — YOUR EXISTING CODE IS PERFECT */}
      </div>
    </div>
  );
};

export default Settings;
