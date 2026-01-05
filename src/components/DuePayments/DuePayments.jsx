import "./DuePayments.css";
import { FaSearch, FaWallet, FaCheckCircle } from "react-icons/fa";

const DuePayments = () => {
  const dues = [
  {
    member: "Rohit Jha",
    plan: "Monthly",
    total: 1500,
    paid: 1000,
    due: 500,
    date: "08 Jan 2026",
  },
];
 // empty state (later replace with API data)

  const totalDue = dues.reduce((sum, d) => sum + d.due, 0);

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
        <input placeholder="Search by name, phone, or member ID..." />
      </div>

      {/* TABLE */}
      <div className="due-table">
        <div className="table-head">
          <span>Member</span>
          <span>Plan</span>
          <span>Total</span>
          <span>Paid</span>
          <span>Due</span>
          <span>Date</span>
          <span>Action</span>
        </div>

        {dues.length === 0 ? (
          <div className="empty-state">
            <FaCheckCircle />
            <p>No pending dues!</p>
          </div>
        ) : (
          dues.map((item, index) => (
            <div className="table-row" key={index}>
              <span>{item.member}</span>
              <span>{item.plan}</span>
              <span>Rs. {item.total}</span>
              <span>Rs. {item.paid}</span>
              <span className="due-amount">Rs. {item.due}</span>
              <span>{item.date}</span>
              <button className="collect-btn">Collect</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DuePayments;
