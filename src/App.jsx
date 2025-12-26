import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import AllMembers from "./components/All Member/AllMember";
import Cardlist from "./components/RFIDcards/Cardlist";
import Replace from "./components/RFIDcards/Replace";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<AllMembers />} />
          <Route path="/rfid" element={<Cardlist />} />
          <Route path="/rfid/replace" element={<Replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
