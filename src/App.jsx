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
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/rfid" element={<Cardlist />} />
          <Route path="/rfid/replace" element={<Replace />} />
          <Route path="/members/expired" element={<ExpiredMembers />} />
          <Route path="/members/expiring" element={<ExpiringSoon />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
