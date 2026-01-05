import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../../config/api";
import logo from "../../assets/logo.png";
import "./auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${API_BASE}/auth/forgot-password`,
        { email }
      );
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* LOGO (same as login) */}

<div className="auth-logo">
  <div className="logo-text">
    <h3>
      THE WELLNESS{" "}
      <img
        src={logo}
        alt="The Wellness Club Gym"
        className="logo-image"
      />{" "}
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


      {/* CARD */}
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p className="auth-subtext">
          Enter your admin email to receive a reset link
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              placeholder="Admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p className="auth-message">{message}</p>
        )}
      </div>
    </div>
  );
}
