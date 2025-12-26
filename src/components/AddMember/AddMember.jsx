import React, { useState } from "react";
import "./AddMember.css";
import { FaCamera, FaUserPlus, FaIdCard } from "react-icons/fa";

const AddMember = () => {
  /* 🔹 Membership dropdown state */
  const [planOpen, setPlanOpen] = useState(false);
  const [membershipPlan, setMembershipPlan] = useState("Select a plan");

  const membershipOptions = ["Monthly", "3 Months", "6 Months", "Yearly"];

  /* 🔹 Gender dropdown state */
  const [genderOpen, setGenderOpen] = useState(false);
  const [gender, setGender] = useState("Select gender");

  const genderOptions = ["Male", "Female", "Other"];

  return (
    <div className="add-member-page">
      {/* PAGE HEADER */}
      <div className="page-header">
        <h1>Add New Member</h1>
        <p>Register a new gym member</p>
      </div>

      {/* PROFILE PHOTO */}
      <div className="card">
        <div className="card-title">Profile Photo</div>

        <div className="photo-section">
          <div className="photo-circle">
            <FaCamera />
          </div>

          <div>
            <button className="btn-secondary">Upload Photo</button>
            <p className="hint-text">Coming soon</p>
          </div>
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <div className="card">
        <div className="card-title">
          <FaUserPlus /> Personal Information
        </div>

        <div className="form-grid">
          <div>
            <label>Full Name *</label>
            <input type="text" placeholder="Enter full name" />
          </div>

          <div>
            <label>Phone Number *</label>
            <input type="text" placeholder="9876543210" />
          </div>

          <div>
            <label>Email Address</label>
            <input type="email" placeholder="email@example.com" />
          </div>

          {/* 🔹 GENDER DROPDOWN */}
          <div className="dropdown">
            <label>Gender</label>

            <div
              className={`dropdown-header ${genderOpen ? "active" : ""}`}
              onClick={() => setGenderOpen(!genderOpen)}
            >
              {gender}
              <span className="arrow">▾</span>
            </div>

            {genderOpen && (
              <ul className="dropdown-list">
                {genderOptions.map((g) => (
                  <li
                    key={g}
                    onClick={() => {
                      setGender(g);
                      setGenderOpen(false);
                    }}
                  >
                    {g}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label>Date of Birth</label>
            <input type="date" />
          </div>

          <div>
            <label>Address</label>
            <input type="text" placeholder="Enter full address" />
          </div>
        </div>
      </div>

      {/* MEMBERSHIP DETAILS */}
      <div className="card">
        <div className="card-title">
          <FaIdCard /> Membership Details
        </div>

        <div className="form-grid">
          {/* 🔹 MEMBERSHIP PLAN DROPDOWN */}
          <div className="dropdown">
            <label>Membership Plan *</label>

            <div
              className={`dropdown-header ${planOpen ? "active" : ""}`}
              onClick={() => setPlanOpen(!planOpen)}
            >
              {membershipPlan}
              <span className="arrow">▾</span>
            </div>

            {planOpen && (
              <ul className="dropdown-list">
                {membershipOptions.map((plan) => (
                  <li
                    key={plan}
                    onClick={() => {
                      setMembershipPlan(plan);
                      setPlanOpen(false);
                    }}
                  >
                    {plan}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="form-actions">
        <button className="btn-outline">Cancel</button>
        <button className="btn-primary">
          <FaUserPlus /> Add Member
        </button>
      </div>
    </div>
  );
};

export default AddMember;
