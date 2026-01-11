import "./ExpiringSoon.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import RenewMembership from "../RenewMembership/RenewMembership";

/* 🔹 COLOR BASED ON DAYS LEFT */
const getColor = (days) => {
  if (days <= 1) return "danger";
  if (days <= 3) return "warning";
  return "success";
};

const ExpiringSoon = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRenew, setShowRenew] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  /* 🔹 FETCH EXPIRING MEMBERS (JWT + Branch safe) */
  const fetchExpiringSoon = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/members/expiring");

      const list = Array.isArray(res.data) ? res.data : [];
      setMembers(list);
    } catch (error) {
      console.error(
        "Failed to load expiring members:",
        error?.response?.data || error.message
      );
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpiringSoon();
  }, []);

  /* 🔹 OPEN RENEW MODAL */
  const handleRenewClick = (member) => {
    setSelectedMember(member);
    setShowRenew(true);
  };

  return (
    <div className="expiring-card">
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

      <div className="expiring-list">
        {loading && <p>Loading...</p>}

        {!loading && members.length === 0 && (
          <p>No memberships expiring soon</p>
        )}

        {!loading &&
          members.slice(0, 5).map((m) => (
            <div className="expiring-item" key={m._id}>
              <div className="left">
                <div className="avatar">
                  {m.photo ? (
                    <img src={m.photo} alt={m.fullName} />
                  ) : (
                    (m.fullName || "?").charAt(0).toUpperCase()
                  )}
                </div>

                <div>
                  <h4>{m.fullName}</h4>
                  <span>{m.phone}</span>
                </div>
              </div>

              <div className="right">
                <div className="plan">
                  {m.plan?.name || m.plan || "-"}
                </div>

                <div className={`days ${getColor(m.daysLeft)}`}>
                  {m.daysLeft} day{m.daysLeft !== 1 ? "s" : ""}
                </div>

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

      {/* 🔁 RENEW MODAL */}
      {showRenew && selectedMember && (
        <RenewMembership
          member={selectedMember}
          onClose={() => {
            setShowRenew(false);
            fetchExpiringSoon(); // 🔄 refresh after renewal
          }}
        />
      )}
    </div>
  );
};

export default ExpiringSoon;
