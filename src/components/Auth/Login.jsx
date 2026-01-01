import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
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

  // 🔐 REAL BACKEND LOGIN
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

      // Save JWT token
      localStorage.setItem("token", res.data.token);

      // Save admin info (optional)
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* LOGO */}
      <div className="auth-logo">
        <span className="logo-icon">☰</span>
        <div>
          <h3>PowerFit</h3>
          <p>Management</p>
        </div>
      </div>

      {/* LOGIN CARD */}
      <div className="auth-card">
        <h2>{role === "admin" ? "Admin Login" : "User Login"}</h2>

        <form onSubmit={handleLogin}>
          {/* EMAIL */}
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

          {/* PASSWORD */}
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

          {/* ERROR MESSAGE */}
          {error && <p className="error-text">{error}</p>}

          {/* LOGIN ROW */}
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

        <Link to="/forgot-password" className="forgot-link">
           Forgot Password?
        </Link>

        <p className="switch-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate(`/signup/${role}`)}>
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;