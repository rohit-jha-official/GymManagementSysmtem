import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import AllMembers from "./components/All Member/AllMember";
import AddMember from "./components/AddMember/AddMember";
import SearchAttendance from "./components/SearchAttendance/SearchAttendance";
import DownloadReports from "./components/DownloadReports/DownloadReports";
import Notifications from "./components/Notifications/Notifications";
import Settings from "./components/Settings/Settings";
import Cardlist from "./components/RFIDcards/Cardlist";
import Replace from "./components/RFIDcards/Replace";
import ExpiredMembers from "./components/ExpiredMembers/ExpiredMembers";
import ExpiringSoon from "./components/ExpiringSoon_1/ExpiringSoon_1";
import Attendance from "./components/Attendance_1/Attendance_1";
import MembershipPlans from "./components/MembershipPlans/MembershipPlans";
import CurrentlyActive from "./components/Attendance_1/CurrentlyActive";
import TotalCheck_ins from "./components/Attendance_1/TotalCheck_ins";
import CheckedOutMembers from "./components/Attendance_1/Checked_out";

import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";


import UserLayout from "./components/User/UserLayout/UserLayout";
import UserDashboard from "./components/User/User_dashboard/User_dashboard";


/* ===== USER DUMMY PAGES (TEMPORARY) ===== */
const UserWorkout = () => <h1 style={{ color: "#fff" }}>Workout</h1>;
const UserRanks = () => <h1 style={{ color: "#fff" }}>Ranks</h1>;
const UserPlans = () => <h1 style={{ color: "#fff" }}>Plans</h1>;
const UserProfile = () => <h1 style={{ color: "#fff" }}>Profile</h1>;


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH ROUTES (NO LAYOUT) */}
        <Route path="/login/:role" element={<Login />} />
        <Route path="/signup/:role" element={<Signup />} />

        {/* MAIN APP WITH LAYOUT */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<AllMembers />} />
          <Route path="/members/add" element={<AddMember />} />
          <Route path="/attendance/search" element={<SearchAttendance />} />
          <Route path="/attendance/reports" element={<DownloadReports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/rfid" element={<Cardlist />} />
          <Route path="/rfid/replace" element={<Replace />} />
          <Route path="/members/expired" element={<ExpiredMembers />} />
          <Route path="/members/expiring" element={<ExpiringSoon />} />
          <Route path="/attendance/today" element={<Attendance />} />
          <Route path="/plan" element={<MembershipPlans />} />
          <Route path="/attendance/total-checkins" element={<TotalCheck_ins />} />
          <Route path="/attendance/active" element={<CurrentlyActive />} />
          <Route path="/attendance/checked-out" element={<CheckedOutMembers />} />
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/workout" element={<UserWorkout />} />
          <Route path="/user/ranks" element={<UserRanks />} />
          <Route path="/user/plans" element={<UserPlans />} />
          <Route path="/user/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
