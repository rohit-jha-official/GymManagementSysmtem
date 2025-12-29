import React from "react";
import "./adminlogin.css";
import { FaUser, FaLock } from "react-icons/fa";

export default function AdminLogin() {
  return (
    <div className="login-page">
      {/* LOGO */}
      <div className="logo">
        <span className="logo-icon">☰</span>
        <div>
          <h3>PowerFit</h3>
          <p>Management</p>
        </div>
      </div>

      {/* LOGIN CARD */}
      <div className="login-card">
        <h2>Admin Login</h2>

        <div className="input-box">
          <FaUser className="input-icon" />
          <input type="text" placeholder="Username or Email" />
        </div>

        <div className="input-box">
          <FaLock className="input-icon" />
          <input type="password" placeholder="Password" />
        </div>

        <div className="login-actions">
          <button className="login-btn">LOGIN</button>

          <label className="remember">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
        </div>

        <p className="forgot">Forgot Password?</p>

        <p className="signup-text">
          Don’t have an account? <span>Sign up here</span>
        </p>
      </div>
    </div>
  );
}
