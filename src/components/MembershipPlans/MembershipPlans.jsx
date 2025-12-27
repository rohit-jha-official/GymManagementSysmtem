import "./MembershipPlans.css";
import { FaBolt, FaStar, FaCrown, FaGem, FaCheck } from "react-icons/fa";

const plans = [
  {
    name: "Monthly",
    duration: "1 Month",
    price: "₹999",
    icon: <FaBolt />,
    features: [
      "Full Gym Access",
      "Locker Room",
      "Basic Equipment",
      "1 PT Session",
    ],
    members: 45,
    popular: false,
  },
  {
    name: "Quarterly",
    duration: "3 Months",
    price: "₹2,499",
    icon: <FaStar />,
    features: [
      "Full Gym Access",
      "Locker Room",
      "All Equipment",
      "3 PT Sessions",
      "Diet Plan",
    ],
    members: 78,
    popular: true,
  },
  {
    name: "Half Yearly",
    duration: "6 Months",
    price: "₹4,499",
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
    popular: false,
  },
  {
    name: "Yearly",
    duration: "12 Months",
    price: "₹7,999",
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
    popular: false,
  },
];

const MembershipPlans = () => {
  return (
    <div className="membership-page">
      {/* HEADER */}
      <div className="page-header">
        <h1>Membership Plans</h1>
        <p>Manage gym membership plans and pricing</p>
      </div>

      {/* PLANS */}
      <div className="plans-grid">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`plan-card ${plan.popular ? "popular" : ""}`}
          >
            {plan.popular && <span className="popular-badge">Popular</span>}

            <div className="plan-icon">{plan.icon}</div>

            <h2>{plan.name}</h2>
            <p className="duration">{plan.duration}</p>

            <div className="price">{plan.price}</div>

            <ul className="features">
              {plan.features.map((f) => (
                <li key={f}>
                  <FaCheck /> {f}
                </li>
              ))}
            </ul>

            <div className="members">
              {plan.members} Active Members
            </div>

            <button
              className={`edit-btn ${
                plan.popular ? "highlight" : ""
              }`}
            >
              Edit Plan
            </button>
          </div>
        ))}
      </div>

      {/* STATISTICS */}
      <div className="stats-card">
        <h2>Plan Statistics</h2>
        <p className="sub-text">Overview of membership distribution</p>

        <div className="stats-grid">
          <div>
            <span className="counttt">45</span>
            <span>Monthly Members</span>
          </div>
          <div>
            <span className="counttt">78</span>
            <span>Quarterly Members</span>
          </div>
          <div>
            <span className="counttt">52</span>
            <span>Half Yearly Members</span>
          </div>
          <div>
            <span className="counttt">34</span>
            <span>Yearly Members</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPlans;
