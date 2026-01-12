import "./ViewMemberDetails.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

import {
  FiX,
  FiEdit2,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import {
  MdOutlineEmail,
  MdLocationOn,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { FaSyncAlt, FaRegCalendarTimes } from "react-icons/fa";

/* DATE FORMATTER */
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const genderOptions = ["Male", "Female", "Other"];

const ViewMemberDetails = ({ member, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  /* EDITABLE FIELDS */
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [genderOpen, setGenderOpen] = useState(false);

  /* FETCH MEMBER */
  useEffect(() => {
    if (!member?._id) return;

    const fetchMember = async () => {
      try {
        const res = await axiosInstance.get(
          `/members/${member._id}`
        );

        setData({
  ...res.data,
  plan: res.data.planId?.name || "-",
});

        setPhone(res.data.phone || "");
        setEmail(res.data.email || "");
        setGender(res.data.gender || "");
        setAddress(res.data.address || "");
        setExpiryDate(
          res.data.expiryDate
            ? res.data.expiryDate.split("T")[0]
            : ""
        );
      } catch (err) {
        console.error("Failed to load member", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [member]);

  /* SAVE CHANGES */
  const handleSave = async () => {
    try {
      await axiosInstance.put(
        `/members/${member._id}`,
        {
          phone,
          email,
          gender,
          address,
          expiryDate,
          allowExpiryEdit: true,
        }
      );

      setEditMode(false);
      onClose();
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update member");
    }
  };

  if (!member || loading || !data) return null;

  return (
    <div className="view-overlay">
      <div className={`view-modal ${editMode ? "edit-active" : ""}`}>
        {/* HEADER */}
        <div className="view-header">
          <div className="view-title">
            <FaSyncAlt />
            <span>Member Details</span>
          </div>

          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* PROFILE */}
        <div className="profile-top">
          <div className="profile-photo">
            {data.photo ? (
              <img src={data.photo} alt={data.fullName} />
            ) : (
              <span>{data.fullName?.charAt(0)}</span>
            )}
          </div>

          <div className="profile-info">
            <h3>{data.fullName}</h3>

            <div className="profile-meta">
              <span
                className={`status-pill ${member.status?.toLowerCase()}`}
              >
                {member.status}
              </span>

              {/* ✅ FIXED PLAN DISPLAY */}
              <span className="plan-pill">
  {data.plan}
</span>

            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="details-grid">
          {/* LEFT */}
          <div className="detail-box">
            <div className="detail-row">
              <FiPhone className="detail-icon" />
              <div>
                <label>Phone</label>
                {editMode ? (
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                ) : (
                  <p>{data.phone}</p>
                )}
              </div>
            </div>

            <div className="detail-row">
              <MdOutlineEmail className="detail-icon" />
              <div>
                <label>Email</label>
                {editMode ? (
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <p>{data.email || "-"}</p>
                )}
              </div>
            </div>

            <div className="detail-row">
              <FiUser className="detail-icon" />
              <div style={{ width: "100%" }}>
                <label>Gender</label>

                {!editMode ? (
                  <p>{data.gender || "—"}</p>
                ) : (
                  <div className="custom-dropdown">
                    <div
                      className="dropdown-header"
                      onClick={() => setGenderOpen(!genderOpen)}
                    >
                      <span>{gender || "Select gender"}</span>
                      <span className={`arrow ${genderOpen ? "open" : ""}`}>
                        ▾
                      </span>
                    </div>

                    {genderOpen && (
                      <div className="dropdown-menu">
                        {genderOptions.map((g) => (
                          <div
                            key={g}
                            className={`dropdown-item ${
                              gender === g ? "active" : ""
                            }`}
                            onClick={() => {
                              setGender(g);
                              setGenderOpen(false);
                            }}
                          >
                            {g}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="detail-box">
            <div className="detail-row">
              <MdLocationOn className="detail-icon" />
              <div>
                <label>Address</label>
                {editMode ? (
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                ) : (
                  <p>{data.address || "—"}</p>
                )}
              </div>
            </div>

            <div className="detail-row">
              <MdOutlineCalendarMonth className="detail-icon" />
              <div>
                <label>Join Date</label>
                <p>{formatDate(data.startDate)}</p>
              </div>
            </div>

            <div className="detail-row">
              <FaRegCalendarTimes className="detail-icon danger" />
              <div>
                <label>Expiry Date</label>
                {editMode ? (
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                ) : (
                  <p>{formatDate(data.expiryDate)}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="view-footer">
          {editMode ? (
            <button className="btn renew" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="btn edit" onClick={() => setEditMode(true)}>
              <FiEdit2 /> Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMemberDetails;