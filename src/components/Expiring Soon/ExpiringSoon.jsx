import "./ExpiringSoon.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../../config/api";
import RenewMembership from "../RenewMembership/RenewMembership"; // ✅ ADD

const getColor = (days) => {
  if (days <= 1) return "danger";
  if (days <= 3) return "warning";
  return "success";
};

const ExpiringSoon = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ NEW STATES
  const [showRenew, setShowRenew] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchExpiringSoon = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/dashboard/expiring-soon`
        );
        setMembers(res.data);
      } catch (error) {
        console.error("Failed to load expiring members", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiringSoon();
  }, []);

  // ✅ HANDLER
  const handleRenewClick = (member) => {
    setSelectedMember({
      name: member.fullName,
      phone: member.phone,
      plan: member.plan,
    });
    setShowRenew(true);
  };

  return (
    <div className="expiring-card">
      {/* Header */}
      <div className="expiring-header">
        <div>
          <h3>Expiring Soon</h3>
          <p>Next 7 days</p>
        </div>
        <span
          className="view-all"
          onClick={() => navigate("/members/expiring")}
        >
          View All →
        </span>
      </div>

      {/* List */}
      <div className="expiring-list">
        {loading && <p className="loading">Loading...</p>}

        {!loading && members.length === 0 && (
          <p className="empty">No memberships expiring soon</p>
        )}

        {!loading &&
          members.map((m) => (
            <div className="expiring-item" key={m._id}>
              <div className="left">
                <div className="avatar">
                  {m.fullName.charAt(0)}
                </div>
                <div>
                  <h4>{m.fullName}</h4>
                  <span>{m.phone}</span>
                </div>
              </div>

              <div className="right">
                <div className="plan">{m.plan}</div>
                <div className={`days ${getColor(m.daysLeft)}`}>
                  {m.daysLeft} day{m.daysLeft > 1 && "s"}
                </div>

                {/* ✅ UPDATED */}
                <button
                  className="renew-btn"
                  onClick={() => handleRenewClick(m)}
                >
                  Renew
                </button>
              </div>
            </div>
          ))}
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
};

export default ExpiringSoon;
