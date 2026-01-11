import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Layout from "./components/Layout/Layout";

/* DASHBOARD PAGES */
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
import DuePayments from "./components/DuePayments/DuePayments";

/* AUTH PAGES */
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";

function App() {

  useEffect(() => {
    // 🔴 FORCE LOGIN EVERY TIME APP STARTS (ADMIN ONLY)
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 ADMIN AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* 🔁 DEFAULT → ADMIN LOGIN */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 🔐 ADMIN PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>

            <Route path="/dashboard" element={<Dashboard />} />

            {/* MEMBERS */}
            <Route path="/members" element={<AllMembers />} />
            <Route path="/members/add" element={<AddMember />} />
            <Route path="/members/expired" element={<ExpiredMembers />} />
            <Route path="/members/expiring" element={<ExpiringSoon />} />

            {/* ATTENDANCE */}
            <Route path="/attendance/search" element={<SearchAttendance />} />
            <Route path="/attendance/reports" element={<DownloadReports />} />
            <Route path="/attendance/today" element={<Attendance />} />
            <Route path="/attendance/total-checkins" element={<TotalCheck_ins />} />
            <Route path="/attendance/active" element={<CurrentlyActive />} />
            <Route path="/attendance/checked-out" element={<CheckedOutMembers />} />

            {/* RFID */}
            <Route path="/rfid" element={<Cardlist />} />
            <Route path="/rfid/replace" element={<Replace />} />

            {/* OTHER */}
            <Route path="/plan" element={<MembershipPlans />} />
            <Route path="/due" element={<DuePayments />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
