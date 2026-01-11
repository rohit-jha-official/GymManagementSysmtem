import "./ExpiredMembers.css";
import { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import RenewMembership from "../RenewMembership/RenewMembership";

/* 🔹 DATE FORMATTER */
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function ExpiredMembers() {
  const [expiredMembers, setExpiredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRenew, setShowRenew] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  /* 🔹 FETCH EXPIRED MEMBERS (JWT + Branch safe) */
  const fetchExpiredMembers = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/members/expired");

      const list = Array.isArray(res.data) ? res.data : [];
      setExpiredMembers(list);
    } catch (error) {
      console.error(
        "Failed to load expired members:",
        error?.response?.data || error.message
      );
      setExpiredMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpiredMembers();
  }, []);

  /* 🔹 OPEN RENEW MODAL */
  const handleRenewClick = (member) => {
    setSelectedMember(member);
    setShowRenew(true);
  };

  return (
    <div className="expired-page">
      {/* HEADER */}
      <div className="expired-header">
        <h2>Expired Members</h2>
        <p>{expiredMembers.length} members with expired memberships</p>
      </div>

      {/* TABLE */}
      <div className="expired-table-wrapper">
        <div className="expired-table">
          <div className="table-head">
            <span>Member</span>
            <span>Contact</span>
            <span>Plan</span>
            <span>Expired On</span>
            <span>Days Expired</span>
            <span>Action</span>
          </div>

          {loading ? (
            <p className="loading">Loading expired members...</p>
          ) : expiredMembers.length === 0 ? (
            <p className="loading">No expired members</p>
          ) : (
            expiredMembers.map((m) => (
              <div className="table-row" key={m._id}>
                {/* 👤 MEMBER */}
                <div className="member-info">
                  <div className="avatar">
                    {m.photo ? (
                      <img src={m.photo} alt={m.fullName} />
                    ) : (
                      (m.fullName || "?").charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="member-name">{m.fullName}</div>
                </div>

                {/* 📞 CONTACT */}
                <div>
                  <div>{m.phone}</div>
                  <small>{m.email || "-"}</small>
                </div>

                {/* 📄 PLAN */}
                <div>{m.plan?.name || m.plan || "-"}</div>

                {/* 📅 EXPIRED DATE */}
                <div>{formatDate(m.expiryDate)}</div>

                {/* ⏱️ DAYS EXPIRED */}
                <div className="days-expired">
                  {m.daysExpired} day{m.daysExpired !== 1 ? "s" : ""}
                </div>

                {/* ⚙️ ACTIONS */}
                <div className="actions">
                  <a href={`tel:${m.phone}`} className="call-btn">
                    <FaPhoneAlt size={13} /> Call
                  </a>

                  <button
                    className="renew-btn"
                    onClick={() => handleRenewClick(m)}
                  >
                    Renew
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🔁 RENEW MODAL */}
      {showRenew && selectedMember && (
        <RenewMembership
          member={selectedMember}
          onClose={() => {
            setShowRenew(false);
            fetchExpiredMembers(); // 🔄 refresh after renewal
          }}
        />
      )}
    </div>
  );
}
