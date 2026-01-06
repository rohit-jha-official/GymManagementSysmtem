import "./ExpiredMembers.css";
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

export default function ExpiredMembers() {
  const [expiredMembers, setExpiredMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showRenew, setShowRenew] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  /* 🔹 FETCH EXPIRED MEMBERS */
  useEffect(() => {
    const fetchExpiredMembers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/members/expired`);
        setExpiredMembers(res.data);
      } catch (error) {
        console.error("Failed to load expired members", error);
      } finally {
        setLoading(false);
      }
    };

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
        <p>
          {expiredMembers.length} members with expired memberships
        </p>
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
                    {m.fullName
                      ? m.fullName.charAt(0).toUpperCase()
                      : "?"}
                  </div>
                  <div className="member-name">
                    {m.fullName}
                  </div>
                </div>

                {/* 📞 CONTACT */}
                <div>
                  <div>{m.phone}</div>
                  <small>{m.email}</small>
                </div>

                {/* 📄 PLAN */}
                <div>{m.plan}</div>

                {/* 📅 EXPIRED DATE */}
                <div>{formatDate(m.expiryDate)}</div>

                {/* ⏱️ DAYS EXPIRED */}
                <div className="days-expired">
                  {m.daysExpired} day
                  {m.daysExpired > 1 ? "s" : ""}
                </div>

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
