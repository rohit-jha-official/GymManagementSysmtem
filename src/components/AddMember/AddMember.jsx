import React, { useState, useRef, useEffect } from "react";
import "./AddMember.css";
import { FaCamera, FaUserPlus, FaIdCard } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import CollectPayment from "../CollectPayment/CollectPayment"; // 🔹 ADD

const AddMember = () => {
  const navigate = useNavigate();

  /* ================= FORM STATE ================= */
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [dobInput, setDobInput] = useState("");
  const [dobType, setDobType] = useState("text");
  const [address, setAddress] = useState("");
  const [rfid, setRfid] = useState("");

  /* ================= GENDER ================= */
  const [gender, setGender] = useState("Select gender");
  const [genderOpen, setGenderOpen] = useState(false);
  const genderOptions = ["Male", "Female", "Other"];

  /* ================= MEMBERSHIP ================= */
  const [plans, setPlans] = useState([]);
  const [planOpen, setPlanOpen] = useState(false);
  const [membershipPlan, setMembershipPlan] = useState("Select a plan");
  const [selectedPlanId, setSelectedPlanId] = useState("");

  // 🔹 NEW
  const [selectedPlanPrice, setSelectedPlanPrice] = useState(0);
  const [admissionCharge, setAdmissionCharge] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  /* ================= PHOTO ================= */
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);

  /* ================= MODAL ================= */
  const [showCollect, setShowCollect] = useState(false);

  /* ================= FETCH PLANS + ADMISSION ================= */
  useEffect(() => {
    const fetchPlans = async () => {
    try {
     const res = await axiosInstance.get("/membership-plans");
     const { plans, admissionCharge } = res.data;

     const sortedPlans = (plans || []).sort(
      (a, b) => a.durationDays - b.durationDays
    );
      setPlans(sortedPlans);
      setAdmissionCharge(admissionCharge || 0);
      } catch (err) {
        console.error("Failed to fetch plans");
        setPlans([]);
      }
    };

    // const fetchAdmissionCharge = async () => {
    //   try {
    //     const res = await axiosInstance.get("/admin/admission-charge");
    //     setAdmissionCharge(res.data.admissionCharge || 0);
    //   } catch (err) {
    //     console.error("Failed to fetch admission charge");
    //   }
    // };

    fetchPlans();
    // fetchAdmissionCharge();
  }, []);

  /* ================= CAMERA ================= */
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

  /* ================= DOB ================= */
  const handleDobChange = (e) => {
    const value = e.target.value;
    setDobInput(value);

    if (!value) {
      setDob("");
      return;
    }

    const [yyyy, mm, dd] = value.split("-");
    if (yyyy.length !== 4) return;

    const selectedDate = new Date(value);
    if (selectedDate > new Date()) {
      alert("DOB cannot be a future date");
      return;
    }

    setDob(`${dd}/${mm}/${yyyy}`);
  };

  /* ================= ADD MEMBER (OPEN MODAL) ================= */
  const handleSubmit = () => {
    if (!fullName || !phone || !selectedPlanId || gender === "Select gender") {
      alert("Please fill all required fields");
      return;
    }

    if (phone.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    setShowCollect(true); // 🔥 OPEN COLLECT PAYMENT MODAL
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
                Capture
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
          <input placeholder="Full Name *" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input placeholder="Phone Number *" value={phone} maxLength={10} inputMode="numeric" onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <input
            type={dobType}
            placeholder="DOB"
            value={dobInput}
            onFocus={() => setDobType("date")}
            onBlur={() => !dobInput && setDobType("text")}
            onChange={handleDobChange}
            max={new Date().toISOString().split("T")[0]}
          />

          <div className="dropdown">
            <div className="dropdown-header" onClick={() => setGenderOpen(!genderOpen)}>
              {gender}
            </div>
            {genderOpen && (
              <ul className="dropdown-list">
                {genderOptions.map((g) => (
                  <li key={g} onClick={() => { setGender(g); setGenderOpen(false); }}>
                    {g}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <input placeholder="RFID (optional)" value={rfid} onChange={(e) => setRfid(e.target.value)} />
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
              {plans.length === 0 ? (
                <li className="disabled">No plans available</li>
              ) : (
                plans.map((p) => (
                  <li
                    key={p._id}
                    onClick={() => {
                      setMembershipPlan(p.name);
                      setSelectedPlanId(p.planId);
                      setSelectedPlanPrice(p.price);           // 🔹 ADD
                      const total = p.price + admissionCharge; // 🔹 ADD
                      setTotalAmount(total);                   // 🔹 ADD
                      setPlanOpen(false);
                    }}
                  >
                    {p.name} – ₹{p.price}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        {/* 🔥 AMOUNT BREAKDOWN */}
        {selectedPlanId && (
          <div className="amount-box">
            <div className="row">
              <span>Plan Price</span>
              <span>₹{selectedPlanPrice}</span>
            </div>
            <div className="row">
              <span>Admission Charge</span>
              <span>₹{admissionCharge}</span>
            </div>
            <div className="row total">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        )}

        <div className="form-actions">
          <button className="btn-primary" onClick={handleSubmit}>
            <FaUserPlus /> Add Member
          </button>
        </div>
      </div>

      {/* ================= COLLECT PAYMENT MODAL ================= */}
      {showCollect && (
        <CollectPayment
          totalAmount={totalAmount}
          memberData={{
            fullName,
            phone,
            email,
            gender,
            dob,
            address,
            planId: selectedPlanId,
            planPrice: selectedPlanPrice,
            admissionCharge,
            rfid,
            photo,
          }}
          onClose={() => setShowCollect(false)}
          onSuccess={() => navigate("/members")}
        />
      )}
    </div>
  );
};

export default AddMember;
