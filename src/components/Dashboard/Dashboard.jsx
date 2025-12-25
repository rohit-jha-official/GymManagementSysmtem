import "./Dashboard.css";
import SideNavBar from "../SideNavbar/SideNav";
import Topbar from "../Topbar/Topbar";
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
  return (
    <div className="dashboard">
      <SideNavBar />

      <div className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          {/* HEADER */}
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>Welcome back! Here's what's happening at your gym.</p>
          </div>
        {/* TOP STATS (4 cards) */}
                <div className="stats-grid top-stats">
                  <div className="stat-card">
                    <div>
                      <p>Total Members</p>
                      <h2>420</h2>
                      <span className="positive">+12% from last month</span>
                    </div>
                    <FaUsers className="icon orange" />
                  </div>

                  <div className="stat-card">
                    <div>
                      <p>Today's Check-ins</p>
                      <h2>156</h2>
                      <span>82% of active members</span>
                    </div>
                    <FaUserCheck className="icon green" />
                  </div>

                  <div className="stat-card">
                    <div>
                      <p>Active RFID Cards</p>
                      <h2>385</h2>
                      <span>35 unassigned</span>
                    </div>
                    <FaIdCard className="icon orange" />
                  </div>

                  <div className="stat-card">
                    <div>
                      <p>Expiring Soon</p>
                      <h2>28</h2>
                      <span className="danger">Next 7 days</span>
                    </div>
                    <FaExclamationTriangle className="icon yellow" />
                  </div>
                </div>

                {/* BOTTOM STATS (3 cards – FULL WIDTH) */}
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


          {/* GROWTH + RECENT ACTIVITY ROW */}
                  <div className="dashboard-row">
                    <div className="dashboard-left">
                      <MemberGrowth />
                    </div>

                    <div className="dashboard-right">
                      <RecentActivity />
                    </div>
                  </div>

          {/* EXPIRING SOON + TODAY'S ATTENDANCE ROW */}
                  <div className="dashboard-row">
                    <div className="dashboard-left">
                        <ExpiringSoon />
                      </div>

                    <div className="dashboard-right">
                        <TodaysAttendance />
                        </div>
                      </div>


        </div>
      </div>
    </div>
  );
};

export default Dashboard;
