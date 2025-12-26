import "./SearchAttendance.css";
import { FaSearch, FaUser } from "react-icons/fa";

const SearchAttendance = () => {
  return (
    <div className="search-attendance-page">
      {/* HEADER */}
      <div className="page-header">
        <h1>Search Attendance</h1>
        <p>Search attendance records by member or date</p>
      </div>

      {/* SEARCH CARD */}
      <div className="card">
        <div className="search-grid">
          {/* MEMBER */}
          <div className="form-group">
            <label>Member Name / RFID</label>
            <div className="input-icon">
              <FaUser />
              <input type="text" placeholder="Search member..." />
            </div>
          </div>

          {/* FROM DATE */}
          <div className="form-group">
            <label>From Date</label>
            <input type="date" />
          </div>

          {/* TO DATE */}
          <div className="form-group">
            <label>To Date</label>
            <input type="date" />
          </div>

          {/* BUTTON */}
          <div className="form-group btn-wrapper">
            <button className="btn-primary full-btn">
              <FaSearch /> Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAttendance;
