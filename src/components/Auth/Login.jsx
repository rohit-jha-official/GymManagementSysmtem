import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./auth.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* 🔁 REDIRECT IF ALREADY LOGGED IN */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* 🔐 ADMIN LOGIN */
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
          role: "admin", // 🔒 FIXED AS ADMIN
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Admin login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* LOGO */}
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

      {/* LOGIN CARD */}
      <div className="auth-card">
        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          {/* EMAIL */}
          <div className="input-box">
            <FaUser />
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="input-box password-box">
            <FaLock />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* ERROR */}
          {error && <p className="error-text">{error}</p>}

          {/* ACTION ROW */}
          <div className="login-row">
            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>

            <label className="checkbox">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
          </div>
        </form>

        {/* FORGOT PASSWORD */}
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Link to="/forgot-password" className="forgot-link">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
