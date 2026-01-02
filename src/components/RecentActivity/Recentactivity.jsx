import "./RecentActivity.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCheck,
  FaUserPlus,
  FaMoneyBill,
  FaExclamationTriangle,
  FaTrash,
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
      const res = await axios.get(
        `${API_BASE}/activity/recent`
      );
      setActivities(res.data);
    };

    fetchRecentActivity();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this activity?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE}/activity/${id}`);

      setActivities((prev) =>
        prev.filter((a) => a._id !== id)
      );
    } catch (error) {
      alert("Failed to delete activity");
    }
  };

  return (
    <div className="recent-activity">
      <div className="ra-header">
        <h3>Recent Activity</h3>
        
      </div>

      <div className="ra-list">
        {activities.length === 0 ? (
          <p className="ra-empty">No recent activity</p>
        ) : (
          activities.map((item) => (
            <div className="ra-item" key={item._id}>
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
                  {new Date(
                    item.createdAt
                  ).toLocaleTimeString()}
                </span>
              </div>

              <button
                className="ra-delete"
                onClick={() =>
                  handleDelete(item._id)
                }
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
