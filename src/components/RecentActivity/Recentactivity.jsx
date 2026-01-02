import "./RecentActivity.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCheck,
  FaUserPlus,
  FaMoneyBill,
  FaExclamationTriangle,
} from "react-icons/fa";
import { API_BASE } from "../../config/api";

const getIcon = (type) => {
  switch (type) {
    case "checkin":
      return <FaUserCheck />;
    case "member":
      return <FaUserPlus />;
    case "payment":
      return <FaMoneyBill />;
    case "expiry":
      return <FaExclamationTriangle />;
    default:
      return <FaUserCheck />;
  }
};

const getTypeClass = (type) => {
  switch (type) {
    case "checkin":
    case "payment":
      return "success";
    case "member":
      return "info";
    case "expiry":
      return "warning";
    default:
      return "info";
  }
};

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/activity/recent`
        );
        setActivities(res.data);
      } catch (error) {
        console.error("Failed to load recent activity", error);
      }
    };

    fetchRecentActivity();
  }, []);

  return (
    <div className="recent-activity">
      <div className="ra-header">
        <h3>Recent Activity</h3>
        <span className="view-all">View All</span>
      </div>

      <div className="ra-list">
        {activities.length === 0 ? (
          <p className="ra-empty">No recent activity</p>
        ) : (
          activities.map((item, index) => (
            <div className="ra-item" key={index}>
              <div
                className={`ra-icon ${getTypeClass(
                  item.type
                )}`}
              >
                {getIcon(item.type)}
              </div>
              <div className="ra-content">
                <p className="ra-title">{item.message}</p>
                <span className="ra-time">
                  {new Date(item.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
