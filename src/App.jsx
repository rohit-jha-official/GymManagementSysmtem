import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import AllMembers from "./components/All Member/AllMember";
import AddMember from "./components/AddMember/AddMember";
import SearchAttendance from "./components/SearchAttendance/SearchAttendance";
import DownloadReports from "./components/DownloadReports/DownloadReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<AllMembers />} />
          <Route path="/members/add" element={<AddMember />} />
          <Route path="/attendance/search" element={<SearchAttendance />} />
          <Route path="/attendance/reports" element={<DownloadReports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
