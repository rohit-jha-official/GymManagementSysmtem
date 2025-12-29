import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      password: formData.password,
      role: role,
    };

    console.log("LOGIN PAYLOAD:", payload);

    // 🔐 Backend call later
    // axios.post("/api/auth/login", payload)

    // TEMP redirect
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
              type="text"
              name="email"
              placeholder="Username or Email"
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

          <div className="login-row">
            <button type="submit" className="primary-btn">
              LOGIN
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

        <p className="link-text">Forgot Password?</p>

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
