import React, { useState, useRef, useEffect } from "react";
import "./AddMember.css";
import { FaCamera, FaUserPlus, FaIdCard } from "react-icons/fa";
import { API_BASE } from "../../config/api";

const AddMember = () => {
  /* 🔹 FORM STATE */
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [dobInput, setDobInput] = useState("");
  const [dobType, setDobType] = useState("text");
  const [address, setAddress] = useState("");
  const [rfid, setRfid] = useState("");

  /* 🔹 GENDER */
  const [gender, setGender] = useState("Select gender");
  const [genderOpen, setGenderOpen] = useState(false);
  const genderOptions = ["Male", "Female", "Other"];

  /* 🔹 MEMBERSHIP */
  const [plans, setPlans] = useState([]);
  const [planOpen, setPlanOpen] = useState(false);
  const [membershipPlan, setMembershipPlan] = useState("Select a plan");
  const [selectedPlanId, setSelectedPlanId] = useState("");

  /* 🔹 PHOTO */
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);

  /* 🔹 FETCH MEMBERSHIP PLANS */
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${API_BASE}/plans`);
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        console.error("Failed to fetch plans", err);
      }
    };
    fetchPlans();
  }, []);

  /* 📷 CAMERA */
  const handleCameraClick = async () => {
    try {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
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

    const base64 = canvas.toDataURL("image/jpeg", 0.7);
    setPhoto(base64);
    setPhotoPreview(base64);

    video.srcObject.getTracks().forEach((t) => t.stop());
    setCameraOn(false);
  };

  /* 📁 UPLOAD PHOTO */
  const handleUploadClick = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      setCameraOn(false);
    }
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 300 * 1024) {
      alert("Photo must be under 300KB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  /* 📅 DOB */
  const handleDobChange = (e) => {
    const value = e.target.value;
    setDobInput(value);

    if (!value) {
      setDob("");
      return;
    }

    const [yyyy, mm, dd] = value.split("-");
    setDob(`${dd}/${mm}/${yyyy}`);
  };

  /* 🚀 SUBMIT */
  const handleSubmit = async () => {
    if (!fullName || !phone || !selectedPlanId || gender === "Select gender") {
      alert("Please fill all required fields");
      return;
    }

    if (phone.length !== 10) {
      alert("Phone number must be exactly 10 digits");
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
          plan: selectedPlanId,
          rfid,
          photo,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Backend error");
        return;
      }

      alert("Member added successfully ✅");

      setFullName("");
      setPhone("");
      setEmail("");
      setDob("");
      setDobInput("");
      setDobType("text");
      setAddress("");
      setRfid("");
      setGender("Select gender");
      setMembershipPlan("Select a plan");
      setSelectedPlanId("");
      setPhoto(null);
      setPhotoPreview(null);
    } catch {
      alert("Network error");
    }
  };

  return (
    <div className="add-member-page">
      <div className="page-header">
        <h1>Add New Member</h1>
        <p>Register a new gym member</p>
      </div>

      {/* PHOTO */}
      <div className="card">
        <div className="card-title">Profile Photo</div>

        <div className="photo-section">
          <div className="photo-circle" onClick={handleCameraClick}>
            {photoPreview ? <img src={photoPreview} alt="Profile" /> : <FaCamera />}
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
      </div>

      {/* PERSONAL INFO */}
      <div className="card">
        <div className="card-title">
          <FaUserPlus /> Personal Information
        </div>

        <div className="form-grid">
          <input
            placeholder="Full Name *"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            placeholder="Phone Number *"
            value={phone}
            maxLength={10}
            inputMode="numeric"
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type={dobType}
            placeholder="DOB"
            value={dobInput}
            onFocus={() => setDobType("date")}
            onBlur={() => !dobInput && setDobType("text")}
            onChange={handleDobChange}
          />

          <div className="dropdown">
            <div className="dropdown-header" onClick={() => setGenderOpen(!genderOpen)}>
              {gender}
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

          <input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            placeholder="RFID (optional)"
            value={rfid}
            onChange={(e) => setRfid(e.target.value)}
          />
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
              {plans.map((p) => (
                <li
                  key={p._id}
                  onClick={() => {
                    setMembershipPlan(p.name);
                    setSelectedPlanId(p._id);
                    setPlanOpen(false);
                  }}
                >
                  {p.name} – ₹{p.price}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-actions">
          <button className="btn-primary" onClick={handleSubmit}>
            <FaUserPlus /> Add Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
