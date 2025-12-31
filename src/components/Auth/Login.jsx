import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./auth.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const { role } = useParams(); // admin | user
  const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);

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

  // ✅ DUMMY ADMIN LOGIN (NO BACKEND)
  if (
    role === "admin" &&
    formData.email === "admin@gmail.com" &&
    formData.password === "admin123"
  ) {
    localStorage.setItem("isAdminLoggedIn", "true");
    navigate("/dashboard");
  } else {
    alert("Invalid Admin Credentials");
  }
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


          <div className="login-row">
            <button type="submit" className="primary-btn">
              LOGIN
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
