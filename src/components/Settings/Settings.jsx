import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";   // 🔥 use JWT client
import "./Settings.css";
import { FaUser } from "react-icons/fa";

const Settings = () => {
  const navigate = useNavigate();

  /* ================= AUTH PROTECTION ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login/admin");
    }
  }, [navigate]);

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
      const res = await axiosInstance.put("/admin/update", adminData);

      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      alert("Profile updated successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async () => {
    try {
      await axiosInstance.put("/admin/change-password", passwordData);

      alert("Password changed successfully");
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account and system settings</p>
      </div>

      <div className="settings-card">
        <h2>
          <FaUser /> Admin Account
        </h2>
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

        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
          <button className="primary-btn" onClick={handleSaveProfile}>
            Save Changes
          </button>

          <button className="primary-btn" onClick={handleChangePassword}>
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
