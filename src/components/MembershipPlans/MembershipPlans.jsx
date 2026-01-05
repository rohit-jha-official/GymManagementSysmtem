import { useEffect, useState } from "react";
import "./MembershipPlans.css";
import {
  FaBolt,
  FaStar,
  FaCrown,
  FaGem,
  FaCheck,
} from "react-icons/fa";
import axios from "axios";
import { API_BASE } from "../../config/api";
import EditPlanModal from "../EditPlanModal/EditPlanModal";

/* 🔥 ICON MAP (UI UNCHANGED) */
const planIcons = {
  Monthly: <FaBolt />,
  Quarterly: <FaStar />,
  "Half Yearly": <FaCrown />,
  Yearly: <FaGem />,
};

const MembershipPlans = () => {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);

  /* ✅ FETCH PLANS FROM BACKEND */
  const fetchPlans = async () => {
    try {
      const res = await axios.get(`${API_BASE}/plans`);

      const formattedPlans = res.data.map((p) => ({
        _id: p._id,
        name: p.name,
        duration: `${p.durationMonths} Months`,
        price: p.price,
        icon: planIcons[p.name],
        features: p.features,
        members: p.activeMembers, // ✅ FROM DB
        badge: p.isPremium
          ? "premium"
          : p.isPopular
          ? "popular"
          : null,
      }));

      setPlans(formattedPlans);
    } catch (err) {
      console.error("Failed to load plans", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  /* ✅ SAVE HANDLER (ADMIN EDIT) */
  const handleSavePlan = async (updatedPlan) => {
    try {
      await axios.put(
        `${API_BASE}/plans/${updatedPlan._id}`,
        {
          price: updatedPlan.price,
          features: updatedPlan.features,
        }
      );

      fetchPlans(); // refresh real data
      setEditingPlan(null);
    } catch (error) {
      alert("Failed to update plan");
    }
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
                {plan.badge === "premium" && "Premium"}
              </span>
            )}

            <div className="plan-icon">{plan.icon}</div>

            <h2>{plan.name}</h2>
            <p className="duration">{plan.duration}</p>

            {/* 💰 PRICE */}
            <div className="price">₹{plan.price}</div>

            {/* FEATURES */}
            <ul className="features">
              {plan.features.map((f, i) => (
                <li key={i}>
                  <FaCheck /> {f}
                </li>
              ))}
            </ul>

            {/* MEMBERS (REAL DATA) */}
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

      {/* EDIT PLAN MODAL */}
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
