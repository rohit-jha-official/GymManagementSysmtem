import { useState } from "react";
import "./MembershipPlans.css";
import {
  FaBolt,
  FaStar,
  FaCrown,
  FaGem,
  FaCheck,
} from "react-icons/fa";

import EditPlanModal from "../EditPlanModal/EditPlanModal";

/* 🔥 INITIAL PLANS (PRICE AS NUMBER ONLY) */
const initialPlans = [
  {
    name: "Monthly",
    duration: "1 Month",
    price: 999,
    icon: <FaBolt />,
    features: [
      "Full Gym Access",
      "Locker Room",
      "Basic Equipment",
      "1 PT Session",
    ],
    members: 45,
    badge: null,
  },
  {
    name: "Quarterly",
    duration: "3 Months",
    price: 2499,
    icon: <FaStar />,
    features: [
      "Full Gym Access",
      "Locker Room",
      "All Equipment",
      "3 PT Sessions",
      "Diet Plan",
    ],
    members: 78,
    badge: "popular",
  },
  {
    name: "Half Yearly",
    duration: "6 Months",
    price: 4499,
    icon: <FaCrown />,
    features: [
      "Full Gym Access",
      "Locker Room",
      "All Equipment",
      "6 PT Sessions",
      "Diet Plan",
      "Sauna Access",
    ],
    members: 52,
    badge: "very",
  },
  {
    name: "Yearly",
    duration: "12 Months",
    price: 7999,
    icon: <FaGem />,
    features: [
      "Full Gym Access",
      "Locker Room",
      "All Equipment",
      "12 PT Sessions",
      "Diet Plan",
      "Sauna Access",
      "Guest Passes",
    ],
    members: 34,
    badge: "premium",
  },
];

const MembershipPlans = () => {
  /* ✅ STATE */
  const [plans, setPlans] = useState(initialPlans);
  const [editingPlan, setEditingPlan] = useState(null);

  /* ✅ SAVE HANDLER FROM MODAL */
  const handleSavePlan = (updatedPlan) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.name === updatedPlan.name ? updatedPlan : p
      )
    );
    setEditingPlan(null);
  };

  return (
    <div className="membership-page">
      {/* HEADER */}
      <div className="page-header">
        <h1>Membership Plans</h1>
        <p>Manage gym membership plans and pricing</p>
      </div>

      {/* PLANS GRID */}
      <div className="plans-grid">
        {plans.map((plan) => (
          <div key={plan.name} className="plan-card">
            {/* 🔥 BADGE */}
            {plan.badge && (
              <span className={`badge ${plan.badge}`}>
                {plan.badge === "popular" && "Popular"}
                {plan.badge === "very" && "Very Popular"}
                {plan.badge === "premium" && "Premium"}
              </span>
            )}

            <div className="plan-icon">{plan.icon}</div>

            <h2>{plan.name}</h2>
            <p className="duration">{plan.duration}</p>

            {/* 💰 PRICE DISPLAY */}
            <div className="price">₹{plan.price}</div>

            {/* FEATURES */}
            <ul className="features">
              {plan.features.map((f, i) => (
                <li key={i}>
                  <FaCheck /> {f}
                </li>
              ))}
            </ul>

            {/* MEMBERS */}
            <div className="members">
              {plan.members} Active Members
            </div>

            {/* EDIT */}
            <button
              className="edit-btn"
              onClick={() => setEditingPlan(plan)}
            >
              Edit Plan
            </button>
          </div>
        ))}
      </div>

      {/* STATISTICS */}
      <div className="stats-card">
        <h2>Plan Statistics</h2>
        <p className="sub-text">
          Overview of membership distribution
        </p>

        <div className="stats-grid">
          {plans.map((p) => (
            <div key={p.name}>
              <span className="counttt">{p.members}</span>
              <span>{p.name} Members</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 EDIT PLAN MODAL */}
      {editingPlan && (
        <EditPlanModal
          plan={editingPlan}
          onClose={() => setEditingPlan(null)}
          onSave={handleSavePlan}
        />
      )}
    </div>
  );
};

export default MembershipPlans;
