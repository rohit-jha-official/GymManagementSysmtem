import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE } from "../../config/api";
import logo from "../../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./auth.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const res = await axios.post(
        `${API_BASE}/auth/reset-password/${token}`,
        { newPassword }
      );

      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="auth-page">
      {/* LOGO */}
      <div className="auth-logo">
        <div className="logo-text">
          <h3>
            THE WELLNESS{" "}
            <img src={logo} alt="The Wellness Club Gym" className="logo-image" />{" "}
            CLUB GYM
          </h3>

          <span className="tag-color-2 tag-rrr">XPRESS</span>

          <p className="logo-tagline">
            <span className="tag-color-1">THE LARGEST</span>{" "}
            <span className="tag-color-2">GYM CHAIN</span>{" "}
            <span className="tag-color-3">IN INDIA</span>
          </p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="auth-form">
        {/* NEW PASSWORD */}
        <div className="password-field">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setShowNewPassword((prev) => !prev)}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="password-field">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">Reset Password</button>
      </form>

      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}
