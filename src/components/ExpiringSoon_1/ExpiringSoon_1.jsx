import "./ExpiringSoon_1.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { FaPhoneAlt } from "react-icons/fa";
import RenewMembership from "../RenewMembership/RenewMembership";

/* 🔹 DATE FORMATTER */
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function ExpiringSoon() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRenew, setShowRenew] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  /* 🔹 FETCH EXPIRING MEMBERS (JWT + Branch safe) */
  const fetchExpiringMembers = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/members/expiring");

      const list = Array.isArray(res.data) ? res.data : [];

      // show only members expiring in next 5 days
      const filtered = list.filter(
        (m) => m.daysLeft <= 5 && m.daysLeft >= 0
      );

      setMembers(filtered);
    } catch (error) {
      console.error(
        "Failed to fetch expiring members:",
        error?.response?.data || error.message
      );
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpiringMembers();
  }, []);

  /* 🔹 BADGE COLOR */
  const getBadgeClass = (days) => {
    if (days <= 3) return "danger-text";
    return "normal-text";
  };

  /* 🔹 OPEN RENEW MODAL */
  const handleRenewClick = (member) => {
    setSelectedMember(member);
    setShowRenew(true);
  };

  return (
    <div className="expiring-page">
      {/* HEADER */}
      <div className="expiring-header">
        <div>
          <h2>Expiring Soon</h2>
          <p>{members.length} memberships expiring in next 5 days</p>
        </div>

        <button className="reminder-btn">Send Reminders</button>
      </div>

      {/* TABLE */}
      <div className="expiring-table-wrapper">
        <div className="expiring-table">
          <div className="table-head">
            <span>Member</span>
            <span>Phone</span>
            <span>Plan</span>
            <span>Expires On</span>
            <span>Days Left</span>
            <span>Actions</span>
          </div>

          {loading ? (
            <p className="loading">Loading expiring members...</p>
          ) : members.length === 0 ? (
            <p className="loading">No memberships expiring soon</p>
          ) : (
            members.map((m) => (
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

                {/* 📞 PHONE */}
                <span>{m.phone}</span>

                {/* 📄 PLAN */}
                <span>{m.plan?.name || m.plan || "-"}</span>

                {/* 📅 EXPIRY */}
                <span>{formatDate(m.expiryDate)}</span>

                {/* ⏳ DAYS LEFT */}
                <span className={`days-badge ${getBadgeClass(m.daysLeft)}`}>
                  {m.daysLeft} day{m.daysLeft !== 1 ? "s" : ""}
                </span>

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
            fetchExpiringMembers(); // refresh after renewal
          }}
        />
      )}
    </div>
  );
}
