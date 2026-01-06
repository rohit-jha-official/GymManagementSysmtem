import "./DuePayments.css";
import { FaSearch, FaWallet, FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../../config/api";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const DuePayments = () => {
  const [dues, setDues] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDuePayments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/members/due`);
      setDues(res.data);
    } catch (error) {
      console.error("Failed to load due payments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDuePayments();
  }, []);

  const handleCollect = async (id) => {
    if (!window.confirm("Mark this due as collected?")) return;

    try {
      await axios.put(`${API_BASE}/members/collect-due/${id}`);
      fetchDuePayments(); // refresh list
    } catch (error) {
      alert("Failed to collect payment");
    }
  };

  const filteredDues = dues.filter(
    (d) =>
      d.fullName.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search)
  );

  const totalDue = filteredDues.reduce(
    (sum, d) => sum + d.dueAmount,
    0
  );

  return (
    <div className="due-page">
      <div className="due-header">
        <div>
          <h1>Due Payments</h1>
          <p>Track and collect pending payments</p>
        </div>

        <div className="total-due-card">
          <FaWallet />
          <div>
            <span>Total Due</span>
            <strong>Rs. {totalDue}</strong>
          </div>
        </div>
      </div>

      <div className="due-search">
        <FaSearch />
        <input
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="due-table">
        <div className="table-head-1">
          <span>Member</span>
          <span>Plan</span>
          <span>Due</span>
          <span>Expiry</span>
          <span>Action</span>
        </div>

        {loading ? (
          <div className="empty-state">
            <p>Loading dues...</p>
          </div>
        ) : filteredDues.length === 0 ? (
          <div className="empty-state">
            <FaCheckCircle />
            <p>No pending dues!</p>
          </div>
        ) : (
          filteredDues.map((item) => (
            <div className="table-row-1" key={item._id}>
              <div className="member-cell">
  <div className="avatar-circle">
    {item.fullName?.charAt(0).toUpperCase()}
  </div>
  <span className="member-name">{item.fullName}</span>
</div>

              <span>{item.plan}</span>
              <span className="due-amount">
                Rs. {item.dueAmount}
              </span>
              <span>{formatDate(item.expiryDate)}</span>

              <button
                className="collect-btn"
                onClick={() => handleCollect(item._id)}
              >
                Collect
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DuePayments;
