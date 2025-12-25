import "./RecentActivity.css";
import {
  FaUserCheck,
  FaUserPlus,
  FaMoneyBill,
  FaExclamationTriangle,
  FaClock,
} from "react-icons/fa";

const activities = [
  {
    icon: <FaUserCheck />,
    title: "Ahmed Khan checked in via RFID",
    time: "2 minutes ago",
    type: "success",
  },
  {
    icon: <FaUserPlus />,
    title: "New member registered: Sara Ali",
    time: "15 minutes ago",
    type: "info",
  },
  {
    icon: <FaMoneyBill />,
    title: "Payment received: Rs. 5,000 - Monthly Plan",
    time: "32 minutes ago",
    type: "success",
  },
  {
    icon: <FaExclamationTriangle />,
    title: "Membership expiring: Usman Malik (3 days)",
    time: "1 hour ago",
    type: "warning",
  },
  {
    icon: <FaClock />,
    title: "Failed scan attempt - Unknown card",
    time: "2 hours ago",
    type: "warning",
  },
  {
    icon: <FaUserCheck />,
    title: "Fatima Zahra checked in via RFID",
    time: "3 hours ago",
    type: "success",
  },
];

const RecentActivity = () => {
  return (
    <div className="recent-activity">
      <div className="ra-header">
        <h3>Recent Activity</h3>
        <span className="view-all">View All</span>
      </div>

      <div className="ra-list">
        {activities.map((item, index) => (
          <div className="ra-item" key={index}>
            <div className={`ra-icon ${item.type}`}>
              {item.icon}
            </div>
            <div className="ra-content">
              <p className="ra-title">{item.title}</p>
              <span className="ra-time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
