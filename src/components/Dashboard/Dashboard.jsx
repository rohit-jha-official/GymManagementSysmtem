import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import RecentActivity from "../RecentActivity/Recentactivity";
import MemberGrowth from "../MemberGrowth/MemberGrowth";
import ExpiringSoon from "../Expiring Soon/ExpiringSoon";
import TodaysAttendance from "../Todays Attendance/TodaysAttendance";
import {
  FaUsers,
  FaUserCheck,
  FaIdCard,
  FaExclamationTriangle,
  FaWallet,
  FaChartLine,
  FaRedoAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate(); // ✅ STEP 2

  return (
    <>
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening at your gym.</p>
      </div>

      {/* TOP STATS */}
      <div className="stats-grid top-stats">
        <div className="stat-card">
          <div>
            <p>Total Members</p>
            <h2>420</h2>
            <span className="positive">+12% from last month</span>
          </div>
          <FaUsers
            className="icon orange clickable"
            onClick={() => navigate("/members")}
          />
        </div>

        <div className="stat-card">
          <div>
            <p>Today's Check-ins</p>
            <h2>156</h2>
            <span>82% of active members</span>
          </div>
          <FaUserCheck
            className="icon green clickable"
            onClick={() => navigate("/attendance/total-checkins")}
          />
        </div>

        <div className="stat-card">
          <div>
            <p>Active RFID Cards</p>
            <h2>385</h2>
            <span>35 unassigned</span>
          </div>
          <FaIdCard
            className="icon orange clickable"
            onClick={() => navigate("/rfid")}
          />
        </div>

        <div className="stat-card">
          <div>
            <p>Expiring Soon</p>
            <h2>28</h2>
            <span className="danger">Next 7 days</span>
          </div>
          <FaExclamationTriangle
            className="icon yellow clickable"
            onClick={() => navigate("/members/expiring")}
          />
        </div>
      </div>

      {/* BOTTOM STATS */}
      <div className="stats-grid bottom-stats">
        <div className="stat-card">
          <div>
            <p>This Month's Revenue</p>
            <h2>Rs. 485,000</h2>
            <span className="positive">+18% from last month</span>
          </div>
          <FaWallet className="icon green" />
        </div>

        <div className="stat-card">
          <div>
            <p>New Registrations</p>
            <h2>32</h2>
            <span>This month</span>
          </div>
          <FaChartLine className="icon orange" />
        </div>

        <div className="stat-card">
          <div>
            <p>Renewal Rate</p>
            <h2>78%</h2>
            <span className="positive">+5% improvement</span>
          </div>
          <FaRedoAlt className="icon orange" />
        </div>
      </div>

      {/* GROWTH + RECENT ACTIVITY */}
      <div className="dashboard-row">
        <MemberGrowth />
        <RecentActivity />
      </div>

      {/* EXPIRING + ATTENDANCE */}
      <div className="dashboard-row">
        <ExpiringSoon />
        <TodaysAttendance />
      </div>
    </>
  );
};

export default Dashboard;
