import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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

import { API_BASE } from "../../config/api";

const Dashboard = () => {
  const navigate = useNavigate();

  /* ✅ DASHBOARD STATS STATE (UPDATED) */
  const [stats, setStats] = useState({
    totalMembers: 0,
    expiringSoon: 0,
    newRegistrations: 0,
    totalRevenue: 0,     // 🆕
    renewalRate: 0,      // 🆕
  });

  /* ✅ FETCH DASHBOARD STATS */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE}/dashboard/stats`);
        setStats(res.data);
      } catch (error) {
        console.error("Dashboard stats error:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
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
            <p>Total Members</p>
            <h2>{stats.totalMembers}</h2>
          </div>
          <FaUsers
            className="icon orange clickable"
            onClick={() => navigate("/members")}
          />
        </div>

        <div className="stat-card">
          <div>
            <p>Today's Check-ins</p>
          </div>
          <FaUserCheck
            className="icon green clickable"
            onClick={() => navigate("/attendance/total-checkins")}
          />
        </div>

        <div className="stat-card">
          <div>
            <p>Active RFID Cards</p>
          </div>
          <FaIdCard
            className="icon orange clickable"
            onClick={() => navigate("/rfid")}
          />
        </div>

        <div className="stat-card">
          <div>
            <p>Expiring Soon</p>
            <h2>{stats.expiringSoon}</h2>
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
            <h2>₹{stats.totalRevenue}</h2> {/* 🆕 */}
          </div>
          <FaWallet className="icon green" />
        </div>

        <div className="stat-card">
          <div>
            <p>New Registrations</p>
            <h2>{stats.newRegistrations}</h2>
            <span>This month</span>
          </div>
          <FaChartLine className="icon orange" />
        </div>

        <div className="stat-card">
          <div>
            <p>Renewal Rate</p>
            <h2>{stats.renewalRate}%</h2> {/* 🆕 */}
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
