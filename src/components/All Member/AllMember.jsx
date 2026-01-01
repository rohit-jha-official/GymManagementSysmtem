import "./AllMembers.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiDownload,
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { API_BASE } from "../../config/api";

const AllMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openActionIndex, setOpenActionIndex] = useState(null);
  const actionRef = useRef(null);

  /* 🔹 FETCH MEMBERS FROM BACKEND */
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/members?search=${search}`
        );
        setMembers(res.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [search]);

  /* 🔹 CLOSE ACTION DROPDOWN ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (actionRef.current && !actionRef.current.contains(e.target)) {
        setOpenActionIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const exportToCSV = () => {
  if (members.length === 0) return;

  const headers = [
    "Name",
    "Phone",
    "Email",
    "Plan",
    "RFID",
    "End Date",
    "Status",
  ];

  const rows = members.map((m) => [
    m.name,
    m.phone,
    m.email,
    m.plan,
    m.rfid || "",
    new Date(m.endDate).toLocaleDateString(),
    m.status,
  ]);

  let csvContent =
    headers.join(",") +
    "\n" +
    rows.map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "members.csv");

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div className="members-page">
      {/* HEADER */}
      <div className="members-header">
        <div>
          <h1>All Members</h1>
          <p>Manage and view all gym members</p>
        </div>

        <button className="export-btn" onClick={exportToCSV}>
           <FiDownload /> Export List
        </button>

      </div>

      {/* SEARCH + FILTER */}
      <div className="members-toolbar">
        <div className="search-box">
          <FiSearch />
          <input
            placeholder="Search by name, phone, or RFID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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

        {loading ? (
          <p className="loading">Loading members...</p>
        ) : members.length === 0 ? (
          <p className="loading">No members found</p>
        ) : (
          members.map((m, i) => (
            <div className="table-row" key={m.id}>
              <div className="member">
                <div className="avatar">{m.name.charAt(0)}</div>
                <span>{m.name}</span>
              </div>

              <div className="contact">
                <span>{m.phone}</span>
                <small>{m.email}</small>
              </div>

              <span>{m.plan}</span>
              <span>{m.rfid || "-"}</span>

              <span>
                {new Date(m.endDate).toLocaleDateString()}
              </span>

              <span
                className={`status ${
                  m.status === "Active"
                    ? "active"
                    : m.status === "Expired"
                    ? "expired"
                    : "expiring"
                }`}
              >
                {m.status}
              </span>

              {/* ACTIONS */}
              <div className="action-wrapper" ref={actionRef}>
                <FiMoreVertical
                  className="action-icon"
                  onClick={() =>
                    setOpenActionIndex(
                      openActionIndex === i ? null : i
                    )
                  }
                />

                {openActionIndex === i && (
                  <div className="action-dropdown">
                    <div className="action-item">
                      <FiEye /> View Details
                    </div>
                    <div className="action-item">
                      <FiEdit2 /> Edit Member
                    </div>
                    <div className="action-item delete">
                      <FiTrash2 /> Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllMembers;
