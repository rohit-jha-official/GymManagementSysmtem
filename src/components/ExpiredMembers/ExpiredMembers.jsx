import { FaPhoneAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ExpiredMembers.css";
import { API_BASE } from "../../config/api";

export default function ExpiredMembers() {
  const [expiredMembers, setExpiredMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔹 FETCH EXPIRED MEMBERS FROM DATABASE */
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

  return (
    <div className="expired-page">
      <div className="expired-header">
        <h2>Expired Members</h2>
        <p>
          {expiredMembers.length} members with expired memberships
        </p>
      </div>

      <div className="expired-table">
        <div className="table-head">
          <span>Member</span>
          <span>Contact</span>
          <span>Plan</span>
          <span>Expired On</span>
          <span>Days</span>
          <span>Action</span>
        </div>

        {loading ? (
          <p className="loading">Loading expired members...</p>
        ) : expiredMembers.length === 0 ? (
          <p className="loading">No expired members</p>
        ) : (
          expiredMembers.map((m) => (
            <div className="table-row" key={m.id}>
              <div className="member-name">{m.name}</div>

              <div>
                <div>{m.phone}</div>
                <small>{m.email}</small>
              </div>

              <div>{m.plan}</div>

              <div>
                {new Date(m.expiryDate).toLocaleDateString()}
              </div>

              <div className="days-expired">
                {m.daysExpired} days
              </div>

              <div className="actions">
                <a
                  href={`tel:${m.phone}`}
                  className="call-btn"
                >
                  <FaPhoneAlt size={13} /> Call
                </a>

                <button className="renew-btn">
                  Renew
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
