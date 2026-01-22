import "./Recentactivity.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {
  FaUserCheck,
  FaUserPlus,
  FaMoneyBill,
  FaExclamationTriangle,
  FaTrash,
} from "react-icons/fa";


/* 🔹 ICON MAPPER */
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

/* 🔹 COLOR MAPPER */
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

const Recentactivity = () => {
  const [activities, setActivities] = useState([]);

  /* 🔹 LOAD ACTIVITIES (JWT SAFE) */
  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const res = await axiosInstance.get("/activity/recent");
        setActivities(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to load activities", error);
        setActivities([]);
      }
    };

    fetchRecentActivity();
  }, []);

  /* 🔹 DELETE ACTIVITY */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this activity?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/activity/${id}`);
      setActivities((prev) => prev.filter((a) => a._id !== id));
    } catch {
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
              <div className={`ra-icon ${getTypeClass(item.type)}`}>
                {getIcon(item.type)}
              </div>

              <div className="ra-content">
                <p className="ra-title">{item.message}</p>
                <span className="ra-time">
                  {new Date(item.createdAt).toLocaleString("en-IN")}
                </span>
              </div>

              <button
                className="ra-delete"
                onClick={() => handleDelete(item._id)}
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

export default Recentactivity;
