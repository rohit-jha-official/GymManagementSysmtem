import "./ExpiringSoon_1.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPhoneAlt } from "react-icons/fa";
import { API_BASE } from "../../config/api";
import RenewMembership from "../RenewMembership/RenewMembership"; // ✅ ADDED

export default function ExpiringSoon() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ ADDED STATES
  const [showRenew, setShowRenew] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  /* 🔹 FETCH EXPIRING MEMBERS FROM DB */
  useEffect(() => {
    const fetchExpiringMembers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/members/expiring`);

        // ✅ SHOW ONLY MEMBERS WITH 5 DAYS OR LESS LEFT
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

  /* 🔹 COLOR BASED ON DAYS LEFT */
  const getBadgeClass = (days) => {
    if (days <= 1) return "danger";
    if (days <= 3) return "warning";
    return "safe";
  };

  // ✅ ADDED HANDLER
  const handleRenewClick = (member) => {
    setSelectedMember(member);
    setShowRenew(true);
  };

  return (
    <div className="expiring-page">
      <div className="expiring-header">
        <div>
          <h2>Expiring Soon</h2>
          <p>{members.length} memberships expiring in next 5 days</p>
        </div>

        <button className="reminder-btn">
          Send Reminders
        </button>
      </div>

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
        <div className="table-row" key={m.id}>
          <span className="member-name">{m.name}</span>
          <span>{m.phone}</span>
          <span>{m.plan}</span>
          <span>
            {new Date(m.expiryDate).toLocaleDateString()}
          </span>
          <span
            className={`days-badge ${getBadgeClass(m.daysLeft)}`}
          >
            {m.daysLeft} day{m.daysLeft > 1 ? "s" : ""}
          </span>
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


      {/* ✅ RENEW MODAL */}
      {showRenew && (
        <RenewMembership
          member={selectedMember}
          onClose={() => setShowRenew(false)}
        />
      )}
    </div>
  );
}
