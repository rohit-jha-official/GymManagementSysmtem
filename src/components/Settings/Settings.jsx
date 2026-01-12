import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./Settings.css";

import {
  FaUser,
  FaKey,
  FaWifi
} from "react-icons/fa";
import { MdWifiOff } from "react-icons/md";

const Settings = () => {
  const navigate = useNavigate();

  /* ================= AUTH PROTECTION ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login/admin");
  }, [navigate]);

  /* ================= TABS ================= */
  const [activeTab, setActiveTab] = useState("admin");

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

  /* ================= LOAD ADMIN FROM BACKEND ================= */
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const res = await axiosInstance.get("/admin/profile");

        setAdminData({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          gymName: res.data.gymName || "",
        });
      } catch (error) {
        console.error("Failed to load admin profile", error);
      }
    };

    fetchAdminProfile();
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
      await axiosInstance.put("/admin/update", {
        name: adminData.name,
        phone: adminData.phone,
        gymName: adminData.gymName,
      });

      alert("Profile updated successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  /* ================= CHANGE PASSWORD (DO NOT TOUCH) ================= */
  const handleChangePassword = async () => {
    try {
      await axiosInstance.put("/admin/change-password", passwordData);
      alert("Password changed successfully");
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Password change failed");
    }
  };

  /* ================= DEVICE STATE ================= */
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
                <label>Branch Name</label>
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

            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button className="primary-btn" onClick={handleSaveProfile}>
                Save Changes
              </button>
              <button className="primary-btn" onClick={handleChangePassword}>
                Update Password
              </button>
            </div>
          </>
        )}

        {/* ================= DEVICE TAB ================= */}
        {activeTab === "device" && (
          <>
            <h2><FaWifi /> Device Status</h2>

            <div className="device-list">
              {devices.map((d, i) => (
                <div className="device-card" key={i}>
                  <div>
                    <h4>{d.name}</h4>
                    <p>{d.desc}</p>
                  </div>

                  <button
                    className={d.online ? "online" : "offline"}
                    onClick={() => toggleDevice(i)}
                  >
                    {d.online ? <FaWifi /> : <MdWifiOff />}
                    {d.online ? "Online" : "Offline"}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
