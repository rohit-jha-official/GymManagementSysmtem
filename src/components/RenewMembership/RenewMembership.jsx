import { useState } from "react";
import { FaSyncAlt, FaCheck } from "react-icons/fa";
import "./RenewMembership.css";

/* 🔹 PLANS */
const plans = [
  { name: "Monthly", duration: "1 Month", price: 800 },
  { name: "3 Months", duration: "3 Months", price: 2199 },
  { name: "6 Months", duration: "6 Months", price: 4199 },
  { name: "9 Months", duration: "9 Months", price: 6199 },
  { name: "Yearly", duration: "12 Months", price: 7199 },
];


const RenewMembership = ({ member, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState("6 Months");
  const [paidAmount, setPaidAmount] = useState("");
  const [sendReceipt, setSendReceipt] = useState(false);

  const plan = plans.find((p) => p.name === selectedPlan);

  /* 🔹 TOTAL & DUE CALCULATION */
  const totalAmount = plan.price ;

  const dueAmount = Math.max(
    totalAmount - (Number(paidAmount) || 0),
    0
  );

  return (
    <div className="renew-overlay">
      <div className="renew-modal">
        {/* HEADER */}
        <div className="renew-header">
          <div className="renew-title">
            <FaSyncAlt className="renew-icon" />
            <span>Renew Membership</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* MEMBER INFO */}
        <div className="member-card">
          <div className="avatar">
            {member?.name?.charAt(0)}
          </div>
          <div className="member-info">
            <h4>{member?.name}</h4>
            <p>{member?.phone}</p>
            <span>Current Plan: {member?.plan}</span>
          </div>
        </div>

        {/* SELECT PLAN */}
        <h5 className="section-title">Select New Plan</h5>

        <div className="plan-list">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`plan ${
                selectedPlan === p.name ? "active" : ""
              }`}
              onClick={() => setSelectedPlan(p.name)}
            >
              <div>
                <h4>{p.name}</h4>
                <span>{p.duration}</span>
              </div>
              <strong>Rs. {p.price.toLocaleString()}</strong>
            </div>
          ))}
        </div>

        {/* AMOUNT PAID */}
        <div className="amount-box">
          <label>Amount Paid</label>
          <input
            type="number"
            placeholder="Rs. Enter paid amount"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
          />
          <p className="hint">
            Plan price: Rs. {plan.price.toLocaleString()} - Enter the amount client has paid 
          </p>
        </div>

        {/* PAYMENT SUMMARY */}
        <div className="summary">
          <h4>Payment Summary</h4>

          <div className="summary-row">
            <span>Plan</span>
            <span>{plan.name}</span>
          </div>

          <div className="summary-row">
            <span>Duration</span>
            <span>{plan.duration}</span>
          </div>

        

          <div className="summary-row">
            <span>Total Amount</span>
            <span>Rs. {totalAmount.toLocaleString()}</span>
          </div>

          <div className="summary-row success">
            <span>Paid Amount</span>
            <span>Rs. {paidAmount || 0}</span>
          </div>

          {/* DIVIDER */}
          <div className="summary-divider"></div>

          {/* DUE AMOUNT + WARNING */}
          <div className="due-group">
            <div className="summary-row danger due-row">
              <span className="due-left">
                <span className="due-icon">ⓘ</span>
                Due Amount
              </span>
              <span>Rs. {dueAmount.toLocaleString()}</span>
            </div>

            <div className="due-warning">
              <span className="due-icon">ⓘ</span>
              Remaining balance to be collected
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="renew-footer">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn confirm">
            <FaCheck />
            Confirm Renewal
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenewMembership;
