import "./AllMembers.css";
import { FiSearch, FiFilter, FiMoreVertical, FiDownload } from "react-icons/fi";

const members = [
  {
    name: "Ahmed Hassan",
    phone: "0300-1234567",
    email: "ahmed@email.com",
    plan: "Monthly",
    rfid: "RF-001",
    end: "2024-12-01",
    status: "Active",
  },
  {
    name: "Fatima Zahra",
    phone: "0321-9876543",
    email: "fatima@email.com",
    plan: "3 Months",
    rfid: "RF-002",
    end: "2025-01-15",
    status: "Active",
  },
  {
    name: "Ali Raza",
    phone: "0333-5678901",
    email: "ali@email.com",
    plan: "Monthly",
    rfid: "RF-003",
    end: "2024-11-20",
    status: "Expired",
  },
  {
    name: "Ayesha Khan",
    phone: "0345-2345678",
    email: "ayesha@email.com",
    plan: "6 Months",
    rfid: "RF-004",
    end: "2025-02-01",
    status: "Active",
  },
  {
    name: "Usman Malik",
    phone: "0312-8765432",
    email: "usman@email.com",
    plan: "Yearly",
    rfid: "RF-005",
    end: "2025-01-01",
    status: "Expiring",
  },
];

const AllMembers = () => {
  return (
    <div className="members-page">
      {/* HEADER */}
      <div className="members-header">
        <div>
          <h1>All Members</h1>
          <p>Manage and view all gym members</p>
        </div>

        <button className="export-btn">
          <FiDownload /> Export List
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="members-toolbar">
        <div className="search-box">
          <FiSearch />
          <input placeholder="Search by name, phone, or RFID..." />
        </div>

        <button className="filter-btn">
          <FiFilter /> Filters
        </button>
      </div>

      {/* TABLE */}
      <div className="members-table">
        <div className="table-head">
          <span>Member</span>
          <span>Contact</span>
          <span>Plan</span>
          <span>RFID Card</span>
          <span>End Date</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {members.map((m, i) => (
          <div className="table-row" key={i}>
            <div className="member">
              <div className="avatar">{m.name[0]}</div>
              <span>{m.name}</span>
            </div>

            <div className="contact">
              <span>{m.phone}</span>
              <small>{m.email}</small>
            </div>

            <span>{m.plan}</span>
            <span>{m.rfid}</span>
            <span>{m.end}</span>

            <span className={`status ${m.status.toLowerCase()}`}>
              {m.status}
            </span>

            <FiMoreVertical className="action-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMembers;
