import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const { role } = useParams(); // admin | user
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔐 BACKEND LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

    console.log("LOGIN PAYLOAD:", payload);
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-logo">
        <span className="logo-icon">☰</span>
        <div>
          <h3>PowerFit</h3>
          <p>Management</p>
        </div>
      </div>

      <div className="auth-card">
        <h2>{role === "admin" ? "Admin Login" : "User Login"}</h2>

        <form onSubmit={handleLogin}>
          <div className="input-box">
            <FaUser />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="login-row">
            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </div>
        </form>

        <p className="link-text">Forgot Password?</p>

        {/* ✅ USER ONLY SIGNUP LINK */}
        {role === "user" && (
          <p className="switch-text">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup/user")}>
              Sign up here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
