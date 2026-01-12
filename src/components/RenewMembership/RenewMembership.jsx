import { useEffect, useState } from "react";
import { FaSyncAlt, FaCheck } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import "./RenewMembership.css";

const RenewMembership = ({ member, onClose }) => {
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(true);

  /* ===============================
     FETCH PLANS (PlanOverride)
     =============================== */
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axiosInstance.get("/membership-plans");
        setPlans(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to load plans", error);
        setPlans([]);
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  /* ===============================
     SELECTED PLAN (PlanOverride)
     =============================== */
  const selectedPlan = plans.find(
    (p) => p._id === selectedPlanId
  );

  /* ===============================
     CALCULATIONS
     =============================== */
  const totalAmount = selectedPlan ? Number(selectedPlan.price) : 0;
  const paid = Number(paidAmount) || 0;
  const dueAmount = Math.max(totalAmount - paid, 0);

  /* ===============================
     VALIDATION
     =============================== */
  const isFormValid =
    selectedPlanId &&
    paidAmount !== "" &&
    paid >= 0;

  /* ===============================
     CONFIRM RENEWAL
     =============================== */
  const handleConfirmRenewal = async () => {
    if (!isFormValid || !member?._id) return;

    try {
      setLoading(true);

      await axiosInstance.put(
        `/members/renew/${member._id}`,
        {
          planId: selectedPlanId, // ✅ PlanOverride._id (SAME AS ADD MEMBER)
          paidAmount: paid,
        }
      );

      alert("Membership renewed successfully ✅");
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
            {member?.fullName?.charAt(0) || "?"}
          </div>
          <div>
            <h4>{member?.fullName}</h4>
            <p>{member?.phone}</p>
            <span>
              Current Plan: {member?.plan?.name || "-"}
            </span>
          </div>
        </div>

        {/* PLANS */}
        <h5>Select New Plan</h5>

        {loadingPlans ? (
          <p className="loading">Loading plans...</p>
        ) : (
          <div className="plan-list">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className={`plan ${
                  selectedPlanId === plan._id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setSelectedPlanId(plan._id)
                }
              >
                <div>
                  <h4>{plan.name}</h4>
                  <span>
                    {plan.durationDays} Days
                  </span>
                </div>
                <strong>₹ {plan.price}</strong>
              </div>
            ))}
          </div>
        )}

        {/* AMOUNT */}
        <div className="amount-box">
          <label>Amount Paid</label>
          <input
            type="number"
            placeholder="Enter paid amount"
            value={paidAmount}
            onChange={(e) =>
              setPaidAmount(e.target.value)
            }
          />

          {selectedPlan && (
            <p className="hint">
              Plan Price: ₹ {selectedPlan.price}
            </p>
          )}
        </div>

        {/* SUMMARY */}
        {selectedPlan && (
          <div className="summary">
            <h4>Payment Summary</h4>

            <div className="summary-row">
              <span>Total</span>
              <span>₹ {totalAmount}</span>
            </div>

            <div className="summary-row success">
              <span>Paid</span>
              <span>₹ {paid}</span>
            </div>

            <div className="summary-row danger">
              <span>Due</span>
              <span>₹ {dueAmount}</span>
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
            {loading
              ? "Processing..."
              : "Confirm Renewal"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenewMembership;
