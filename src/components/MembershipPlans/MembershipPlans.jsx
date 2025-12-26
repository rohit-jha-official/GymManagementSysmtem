import "./MembershipPlans.css";
import { FaBolt, FaStar, FaCrown, FaGem } from "react-icons/fa";

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
    popular: false,
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
      <h1>Membership Plans</h1>
      <p className="subtitle">
        Manage gym membership plans and pricing
      </p>

      <div className="plans-grid">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`plan-card ${plan.popular ? "popular" : ""}`}
          >
            {plan.popular && <span className="badge">Popular</span>}

            <div className="icon">{plan.icon}</div>
            <h2>{plan.name}</h2>
            <span className="duration">{plan.duration}</span>
            <h3 className="price">{plan.price}</h3>

            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>

            <span className="members">
              {plan.members} Active Members
            </span>

            <button className="edit-btn">Edit Plan</button>
          </div>
        ))}
      </div>

      <div className="plan-stats">
        <h2>Plan Statistics</h2>
        <div className="stats-grid">
          <div>
            <h3>45</h3>
            <p>Monthly Members</p>
          </div>
          <div>
            <h3>78</h3>
            <p>Quarterly Members</p>
          </div>
          <div>
            <h3>52</h3>
            <p>Half Yearly Members</p>
          </div>
          <div>
            <h3>34</h3>
            <p>Yearly Members</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPlans;
