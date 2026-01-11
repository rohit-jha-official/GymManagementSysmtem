import "./AllMembers.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MdOutlineVisibility } from "react-icons/md";
import axios from "axios";
import {
  FiSearch,
  FiMoreVertical,
  FiDownload,
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { API_BASE } from "../../config/api";
import  ViewMemberDetails from "../ViewMemberDetails/ViewMemberDetails"

/* 🔹 DATE FORMATTER */
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const AllMembers = () => {
  const [showView, setShowView] = useState(false);
const [selectedMember, setSelectedMember] = useState(null);


  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [openActionIndex, setOpenActionIndex] = useState(null);

  /* 🔹 READ URL PARAMS */
  const [searchParams] = useSearchParams();
  const planFromUrl = searchParams.get("plan"); // Monthly
  const typeFromUrl = searchParams.get("type"); // active | all
const [planOpen, setPlanOpen] = useState(false);

  /* 🔹 FETCH MEMBERS */
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/members?search=${search}`
        );
        setMembers(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [search]);

  /* 🔹 SYNC URL PLAN → DROPDOWN */
  useEffect(() => {
    if (planFromUrl) {
      setPlanFilter(planFromUrl);
    }
  }, [planFromUrl]);

  /* 🔹 FILTER LOGIC (PLAN + TYPE) */
  useEffect(() => {
    let filtered = members;

    // Dropdown / URL plan filter
    if (planFilter !== "all") {
      filtered = filtered.filter(
        (m) => m.plan === planFilter
      );
    }

    // Active-only filter (from MembershipPlans)
    if (typeFromUrl === "active") {
      filtered = filtered.filter(
        (m) => m.status === "Active"
      );
    }

    setFilteredMembers(filtered);
  }, [members, planFilter, typeFromUrl]);

  /* 🔹 CLOSE ACTION DROPDOWN */
  useEffect(() => {
    const closeDropdown = () => setOpenActionIndex(null);
    document.addEventListener("click", closeDropdown);
    return () =>
      document.removeEventListener("click", closeDropdown);
  }, []);

  /* 🔹 DELETE MEMBER */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE}/members/${id}`);
      setMembers((prev) =>
        prev.filter((m) => m._id !== id)
      );
      setOpenActionIndex(null);
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  /* 🔹 EXPORT CSV (FILTERED DATA) */
  const exportToCSV = () => {
    if (filteredMembers.length === 0) return;

    const headers = [
      "Name",
      "Phone",
      "Email",
      "Plan",
      "RFID",
      "End Date",
      "Status",
    ];

    const rows = filteredMembers.map((m) => [
      m.name,
      m.phone,
      m.email,
      m.plan,
      m.rfid || "",
      formatDate(m.endDate),
      m.status,
    ]);

    const csvContent =
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
          <p>
            {planFilter !== "all"
              ? `${planFilter} Members`
              : "Manage and view all gym members"}
          </p>
        </div>

        <button className="export-btn" onClick={exportToCSV}>
          <FiDownload /> Export List
        </button>
      </div>

      {/* TOOLBAR */}
      <div className="members-toolbar">
        {/* SEARCH */}
        <div className="search-box">
          <FiSearch />
          <input
            placeholder="Search by name, phone, or RFID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* PLAN FILTER */}
 {/* PLAN FILTER DROPDOWN */}
<div className="filter-dropdown">
  <div
    className="filter-selected"
    onClick={() => setPlanOpen(!planOpen)}
  >
    <span>
      {planFilter === "all" ? "All Plans" : planFilter}
    </span>

    {/* DROPDOWN ICON */}
    <span className={`dropdown-icon ${planOpen ? "open" : ""}`}>
      ▾
    </span>
  </div>

  {planOpen && (
    <div className="filter-options">
      {["All Plans", "Monthly", "Quarterly", "Half Yearly", "Yearly"].map(
        (plan) => (
          <div
            key={plan}
            className={`filter-option ${
              planFilter === plan ? "active" : ""
            }`}
            onClick={() => {
              setPlanFilter(plan === "All Plans" ? "all" : plan);
              setPlanOpen(false);
            }}
          >
            {plan}
          </div>
        )
      )}
    </div>
  )}
</div>


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
        ) : filteredMembers.length === 0 ? (
          <p className="loading">No members found</p>
        ) : (
          filteredMembers.map((m, i) => (
            <div className="table-row" key={m._id}>
              <div className="member">
                <div className="avatar">
  {m.photo ? (
    <img src={m.photo} alt={m.name} />
  ) : (
    m.name.charAt(0)
  )}
</div>

                <span>{m.name}</span>
              </div>

              <div className="contact">
                <span>{m.phone}</span>
                <small>{m.email}</small>
              </div>

              <span>{m.plan}</span>
              <span>{m.rfid || "-"}</span>
              <span>{formatDate(m.endDate)}</span>

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

              <div
                className="action-wrapper"
                onClick={(e) => e.stopPropagation()}
              >
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
                   <div
                      className="action-item"
                      onClick={() => {
                        setSelectedMember(m);
                        setShowView(true);
                        setOpenActionIndex(null);
                      }}
                    >
                      <MdOutlineVisibility /> View Details
                    </div>



                    {/* <div className="action-item">
                      <FiEdit2 /> Edit Member
                    </div> */}
                    <div
                      className="action-item delete"
                      onClick={() => handleDelete(m._id)}
                    >
                      <FiTrash2 /> Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {showView && (
  <ViewMemberDetails
    member={selectedMember}
    onClose={() => setShowView(false)}
  />
)}
    </div>
  );
};

export default AllMembers;
