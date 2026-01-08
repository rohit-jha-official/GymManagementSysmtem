import "./ExpiringSoon_1.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPhoneAlt } from "react-icons/fa";
import { API_BASE } from "../../config/api";
import RenewMembership from "../RenewMembership/RenewMembership";

/* 🔹 DATE FORMATTER: 14 Jan 2004 */
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

  /* 🔹 FETCH EXPIRING MEMBERS */
  useEffect(() => {
    const fetchExpiringMembers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/members/expiring`);

        // show only members expiring in next 5 days
        const filtered = res.data.filter(
          (m) => m.daysLeft <= 5 && m.daysLeft >= 0
        );

        setMembers(filtered);
      } catch (error) {
        console.error("Failed to fetch expiring members", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiringMembers();
  }, []);

  /* 🔹 BADGE COLOR */
const getBadgeClass = (days) => {
  if (days <= 3) return "danger-text"; // 🔴 red text only
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

        <button className="reminder-btn">
          Send Reminders
        </button>
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
                    {m.fullName
                      ? m.fullName.charAt(0).toUpperCase()
                      : "?"}
                  </div>
                  <div className="member-name">
                    {m.fullName}
                  </div>
                </div>

                {/* 📞 PHONE */}
                <span>{m.phone}</span>

                {/* 📄 PLAN */}
                <span>{m.plan}</span>

                {/* 📅 EXPIRY DATE */}
                <span>{formatDate(m.expiryDate)}</span>

                {/* ⏳ DAYS LEFT */}
                <span
                  className={`days-badge ${getBadgeClass(m.daysLeft)}`}
                >
                  {m.daysLeft} day{m.daysLeft > 1 ? "s" : ""}
                </span>

                {/* ⚙️ ACTIONS */}
                <div className="actions">
                  <a
                    href={`tel:${m.phone}`}
                    className="call-btn"
                  >
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
      {showRenew && (
        <RenewMembership
          member={selectedMember}
          onClose={() => setShowRenew(false)}
        />
      )}
    </div>
  );
}
