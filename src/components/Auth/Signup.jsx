import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Signup = () => {
  const { role } = useParams(); // should be only "user"
  const navigate = useNavigate();

  // 🚫 Block admin or invalid roles
  useEffect(() => {
    if (role !== "user") {
      navigate("/login/admin");
    }
  }, [role, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔐 BACKEND SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: "user",
    };

    console.log("SIGNUP PAYLOAD:", payload);

    // 🔐 Backend API later
    // axios.post("/api/auth/signup", payload)

    navigate("/login/user");
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
        <h2>User Sign Up</h2>

        <form onSubmit={handleSignup}>
          <div className="input-box">
            <FaUser />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
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
          <label className="checkbox">
      <input
        type="checkbox"
        name="terms"
        checked={formData.terms}
        onChange={handleChange}
        required
      />
      <span>I agree to the Terms & Privacy</span>
    </label>
          <button
            type="submit"
            className="primary-btn"
            disabled={!formData.terms}
          >
            SIGN UP
          </button>
          
        </form>
        
        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login/user")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
