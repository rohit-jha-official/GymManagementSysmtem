import React from "react";
import "./adminsignup.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function AdminSignup() {
  return (
    <div className="signup-page">
      {/* LOGO */}
      <div className="logo">
        <span className="logo-icon">☰</span>
        <div>
          <h3>PowerFit</h3>
          <p>Management</p>
        </div>
      </div>

      {/* CARD */}
      <div className="signup-card">
        <h2>Admin Sign Up</h2>

        <div className="input-box">
          <FaUser className="input-icon" />
          <input type="text" placeholder="Full Name" />
        </div>

        <div className="input-box">
          <FaEnvelope className="input-icon" />
          <input type="email" placeholder="Email Address" />
        </div>

        {/* NEW PASSWORD */}
        <div className="input-box">
          <FaLock className="input-icon" />
          <input type="password" placeholder="New Password" />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="input-box">
          <FaLock className="input-icon" />
          <input type="password" placeholder="Confirm Password" />
        </div>

        <div className="signup-actions">
          <button className="signup-btn">SIGN UP</button>

          <label className="terms">
            <input type="checkbox" />
            <span>I agree to the Terms & Privacy</span>
          </label>
        </div>

        <p className="login-text">
          Already have the account? <span>Login here</span>
        </p>
      </div>
    </div>
  );
}
