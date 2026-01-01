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

import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";

import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH ROUTES (NO LAYOUT) */}
        <Route path="/login/:role" element={<Login />} />
        <Route path="/signup/:role" element={<Signup />} />

        {/* MAIN APP WITH LAYOUT */}
        <Route element={<Layout />}>
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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
