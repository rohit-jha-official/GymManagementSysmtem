import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import RecentActivity from "../RecentActivity/Recentactivity";
import MemberGrowth from "../MemberGrowth/MemberGrowth";
import ExpiringSoon from "../Expiring Soon/ExpiringSoon";
// import TodaysAttendance from "../Todays Attendance/TodaysAttendance";

import {
  FaUsers,
  FaUserCheck,
  FaIdCard,
  FaExclamationTriangle,
  FaWallet,
  FaChartLine,
  FaRedoAlt,
} from "react-icons/fa";

import { API_BASE } from "../../config/api";

const Dashboard = () => {
  const navigate = useNavigate();

  /* 🔹 DASHBOARD STATS */
  const [stats, setStats] = useState({
    totalMembers: 0,
    newRegistrations: 0,
    totalRevenue: 0,
    renewalRate: 0,
  });

  /* 🔹 EXPIRING COUNT (OPTION 1) */
  const [expiringCount, setExpiringCount] = useState(0);

  /* 🔹 FETCH DASHBOARD STATS */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE}/dashboard/stats`);
        const data = res.data;

        setStats({
          totalMembers: data.totalMembers ?? 0,
          newRegistrations: data.newRegistrations ?? 0,
          totalRevenue: data.totalRevenue ?? 0,
          renewalRate: data.renewalRate ?? 0,
        });
      } catch (error) {
        console.error("Dashboard stats error:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  /* 🔹 FETCH EXPIRING MEMBERS COUNT (SAME LOGIC AS ExpiringSoon_1) */
  useEffect(() => {
    const fetchExpiringCount = async () => {
      try {
        const res = await axios.get(`${API_BASE}/members/expiring`);

        const filtered = res.data.filter(
          (m) => m.daysLeft <= 7 && m.daysLeft >= 0
        );

        setExpiringCount(filtered.length);
      } catch (error) {
        console.error("Failed to fetch expiring members count", error);
      }
    };

    fetchExpiringCount();
  }, []);

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
            <h4>Total Members</h4>
            <h2>{stats.totalMembers}</h2>
          </div>
          <FaUsers
            className="icon orange clickable"
            onClick={() => navigate("/members")}
          />
        </div>

        <div className="stat-card">
          <div>
            <h4>Today's Check-ins</h4>
          </div>
          <FaUserCheck
            className="icon green clickable"
            onClick={() => navigate("/attendance/total-checkins")}
          />
        </div>

        <div className="stat-card">
          <div>
            <h4>Active RFID Cards</h4>
          </div>
          <FaIdCard
            className="icon orange clickable"
            onClick={() => navigate("/rfid")}
          />
        </div>

        {/* ✅ FIXED EXPIRING SOON CARD */}
        <div className="stat-card">
          <div>
            <h4>Expiring Soon</h4>
            <h2>{expiringCount}</h2>
            <span className="danger">Next 5 days</span>
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
            <h4>This Month's Revenue</h4>
            <h2>₹{stats.totalRevenue}</h2>
          </div>
          <FaWallet className="icon green" />
        </div>

        <div className="stat-card">
          <div>
            <h4>New Registrations</h4>
            <h2>{stats.newRegistrations}</h2>
            <span>This month</span>
          </div>
          <FaChartLine className="icon orange" />
        </div>

        <div className="stat-card">
          <div>
            <h4>Renewal Rate</h4>
            <h2>{stats.renewalRate}%</h2>
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
        {/* <TodaysAttendance /> */}
      </div>
    </>
  );
};

export default Dashboard;
