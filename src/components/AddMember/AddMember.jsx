import React, { useState, useRef } from "react";
import "./AddMember.css";
import { FaCamera, FaUserPlus, FaIdCard } from "react-icons/fa";
import { API_BASE } from "../../config/api";

const AddMember = () => {
  /* 🔹 FORM STATE */
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [rfid, setRfid] = useState("");
  const [gender, setGender] = useState("Male");

  /* 🔹 MEMBERSHIP */
  const [planOpen, setPlanOpen] = useState(false);
  const [membershipPlan, setMembershipPlan] = useState("Select a plan");
  const membershipOptions = ["Monthly", "3 Months", "6 Months","9 Months", "12 Months"];

  /* 🔹 PHOTO STATE */
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);

  /* 📷 OPEN CAMERA */
  const handleCameraClick = async () => {
    try {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }

      setCameraOn(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      videoRef.current.srcObject = stream;
    } catch {
      alert("Camera permission denied");
    }
  };

  /* 📸 CAPTURE PHOTO */
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    setPhoto(canvas.toDataURL("image/png"));

    if (video.srcObject) {
      video.srcObject.getTracks().forEach(t => t.stop());
    }
    setCameraOn(false);
  };

  /* 📁 UPLOAD PHOTO */
  const handleUploadClick = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      setCameraOn(false);
    }
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  /* 🚀 SUBMIT */
 const handleSubmit = async () => {
  if (!fullName || !phone || membershipPlan === "Select a plan") {
    alert("Please fill required fields");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        phone,
        email,
        gender,
        dob,
        address,
        plan: membershipPlan,
        rfid,
      }),
    });

    const data = await res.json();   // 🔥 READ BACKEND RESPONSE

    if (!res.ok) {
      alert(data.message || "Backend error");
      return;
    }

    alert("Member added successfully ✅");

    setFullName("");
    setPhone("");
    setEmail("");
    setDob("");
    setAddress("");
    setRfid("");
    setMembershipPlan("Select a plan");
    setPhoto(null);

  } catch (err) {
    console.error("NETWORK ERROR:", err);
    alert("Network error (frontend → backend)");
  }
};


  return (
    <div className="add-member-page">
      <div className="page-header">
        <h1>Add New Member</h1>
        <p>Register a new gym member</p>
      </div>

      {/* PROFILE PHOTO */}
      {/* <div className="card">
        <div className="card-title">Profile Photo</div>

        <div className="photo-section">
          <div
            className="photo-circle"
            title="Open Camera"
            onClick={handleCameraClick}
          >
            {photo ? <img src={photo} alt="Profile" /> : <FaCamera />}
          </div>

          <button className="btn-secondary" onClick={handleUploadClick}>
            Upload Photo
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={handleFileChange}
          />

          {cameraOn && (
            <div className="camera-box">
              <video ref={videoRef} autoPlay playsInline />
              <button className="btn-secondary" onClick={capturePhoto}>
                📸 Capture Photo
              </button>
              <canvas ref={canvasRef} hidden />
            </div>
          )}
        </div>
      </div> */}

      {/* PERSONAL INFO */}
      <div className="card">
        <div className="card-title">
          <FaUserPlus /> Personal Information
        </div>

        <div className="form-grid">
          <input placeholder="Full Name *" value={fullName} onChange={e => setFullName(e.target.value)} />
          <input placeholder="Phone Number *" value={phone} onChange={e => setPhone(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
         <input
  type="text"
  placeholder="Date of Birth"
  onFocus={(e) => (e.target.type = "date")}
  onBlur={(e) => !e.target.value && (e.target.type = "text")}
  value={dob}
  onChange={(e) => setDob(e.target.value)}
/>
          <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
          <input placeholder="RFID (optional)" value={rfid} onChange={e => setRfid(e.target.value)} />
        </div>
      </div>

      {/* MEMBERSHIP */}
      <div className="card">
        <div className="card-title">
          <FaIdCard /> Membership Details
        </div>

        <div className="dropdown">
          <div className="dropdown-header" onClick={() => setPlanOpen(!planOpen)}>
            {membershipPlan}
          </div>

          {planOpen && (
            <ul className="dropdown-list">
              {membershipOptions.map(p => (
                <li
                  key={p}
                  onClick={() => {
                    setMembershipPlan(p);
                    setPlanOpen(false);
                  }}
                >
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="btn-primary" onClick={handleSubmit}>
            <FaUserPlus /> Add Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
