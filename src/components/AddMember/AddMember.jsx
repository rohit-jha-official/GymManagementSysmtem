import React, { useState, useRef } from "react";
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

  /* 🔹 Profile photo state */
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);

  /* Upload from file explorer */
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  /* Open webcam */
  const handleCameraClick = async () => {
    try {
      setCameraOn(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch {
      alert("Camera access denied");
    }
  };

  /* Capture from webcam */
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    setPhoto(canvas.toDataURL("image/png"));

    video.srcObject.getTracks().forEach(track => track.stop());
    setCameraOn(false);
  };

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
          <div className="photo-circle" onClick={handleCameraClick}>
            {photo ? <img src={photo} alt="Profile" /> : <FaCamera />}
          </div>

          <div>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleUploadClick}
            >
              Upload Photo
            </button>
            <p className="hint-text">Click camera or upload</p>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* Camera preview */}
          {cameraOn && (
            <div className="camera-box">
              <video ref={videoRef} autoPlay />
              <button
                type="button"
                className="btn-secondary"
                onClick={capturePhoto}
              >
                Capture
              </button>
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
          )}
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

          {/* Gender dropdown */}
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
