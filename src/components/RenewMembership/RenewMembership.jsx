import { useState } from "react";
import { FaSyncAlt, FaCheck } from "react-icons/fa";
import axios from "axios";
import { API_BASE } from "../../config/api";
import "./RenewMembership.css";

/* 🔹 PLANS */
const plans = [
  { name: "Monthly", duration: "1 Month", price: 800 },
  { name: "3 Months", duration: "3 Months", price: 2199 },
  { name: "6 Months", duration: "6 Months", price: 4199 },
  { name: "9 Months", duration: "9 Months", price: 6199 },
  { name: "Yearly", duration: "12 Months", price: 7199 },
];

const ADMISSION_CHARGE = 700;

const RenewMembership = ({ member, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const plan = plans.find((p) => p.name === selectedPlan);

  const totalAmount = plan
    ? plan.price + ADMISSION_CHARGE
    : 0;

  const dueAmount =
    plan && paidAmount
      ? Math.max(totalAmount - Number(paidAmount), 0)
      : totalAmount;

  /* ✅ FORM VALIDATION */
  const isFormValid =
    selectedPlan !== "" &&
    paidAmount !== "" &&
    Number(paidAmount) > 0;

  /* ✅ CONFIRM HANDLER */
  const handleConfirmRenewal = async () => {
    if (!isFormValid) return;

    try {
      setLoading(true);

      await axios.post(
        `${API_BASE}/members/renew/${member._id}`,
        {
          plan: selectedPlan,
          paidAmount: Number(paidAmount),
          admissionCharge: ADMISSION_CHARGE,
        }
      );

      alert("Membership renewed successfully");
      onClose();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Renewal failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="renew-overlay">
      <div className="renew-modal">
        {/* HEADER */}
        <div className="renew-header">
          <div className="renew-title">
            <FaSyncAlt />
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
          <div>
            <h4>{member?.name}</h4>
            <p>{member?.phone}</p>
            <span>Current Plan: {member?.plan}</span>
          </div>
        </div>

        {/* PLANS */}
        <h5>Select New Plan</h5>
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
              <strong>Rs. {p.price}</strong>
            </div>
          ))}
        </div>

        {/* AMOUNT */}
        <div className="amount-box">
          <label>Amount Paid</label>
          <input
            type="number"
            placeholder="Enter paid amount"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
          />
          {plan && (
            <p className="hint">
              Plan Rs. {plan.price} + Admission Rs. {ADMISSION_CHARGE}
            </p>
          )}
        </div>

        {/* SUMMARY */}
        {plan && (
          <div className="summary">
            <h4>Payment Summary</h4>
            <div className="summary-row">
              <span>Total</span>
              <span>Rs. {totalAmount}</span>
            </div>
            <div className="summary-row success">
              <span>Paid</span>
              <span>Rs. {paidAmount || 0}</span>
            </div>
            <div className="summary-row danger">
              <span>Due</span>
              <span>Rs. {dueAmount}</span>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="renew-footer">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn confirm"
            onClick={handleConfirmRenewal}
            disabled={!isFormValid || loading}
          >
            <FaCheck />
            {loading ? "Processing..." : "Confirm Renewal"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenewMembership;
