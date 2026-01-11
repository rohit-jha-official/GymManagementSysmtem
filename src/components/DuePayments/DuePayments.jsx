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

  /* MODAL STATE */
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [paidAmount, setPaidAmount] = useState("");

  const fetchDuePayments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/members/due`);
      setDues(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDuePayments();
  }, []);

  /* OPEN MODAL */
  const openCollectModal = (item) => {
    setSelected(item);
    setPaidAmount("");
    setShowModal(true);
  };

  /* SUBMIT PAYMENT */
  const handleSubmit = async () => {
    if (!paidAmount || Number(paidAmount) <= 0) {
      return alert("Enter valid amount");
    }

    try {
      await axios.put(
        `${API_BASE}/members/collect-due/${selected._id}`,
        { paidAmount }
      );

      setShowModal(false);
      fetchDuePayments();
    } catch {
      alert("Payment failed");
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
      {/* HEADER */}
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

      {/* SEARCH */}
      <div className="due-search">
        <FaSearch />
        <input
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="due-table">
        <div className="table-head-1">
          <span>Member</span>
          <span>Plan</span>
          <span>Due</span>
          <span>Expiry</span>
          <span>Action</span>
        </div>

        {loading ? (
          <p>Loading...</p>
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
  {item.photo ? (
    <img src={item.photo} alt={item.fullName} />
  ) : (
    item.fullName?.charAt(0)
  )}
</div>

                <span>{item.fullName}</span>
              </div>

              <span>{item.plan}</span>
              <span>Rs. {item.dueAmount}</span>
              <span>{formatDate(item.expiryDate)}</span>

              <button
                className="collect-btn"
                onClick={() => openCollectModal(item)}
              >
                Collect
              </button>
            </div>
          ))
        )}
      </div>

      {/* COLLECT MODAL */}
      {showModal && selected && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Collect Payment</h3>

            <p><strong>Name:</strong> {selected.fullName}</p>
            <p><strong>Plan:</strong> {selected.plan}</p>
            <p><strong>Due:</strong> Rs. {selected.dueAmount}</p>
            <p><strong>Expiry:</strong> {formatDate(selected.expiryDate)}</p>

            <input
              type="number"
              placeholder="Enter paid amount"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DuePayments;
