import "./AllMembers.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FiSearch,
  FiMoreVertical,
  FiDownload,
  FiTrash2,
} from "react-icons/fi";
import { MdOutlineVisibility } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import ViewMemberDetails from "../ViewMemberDetails/ViewMemberDetails";

/* 🔹 DATE FORMATTER */
const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const AllMembers = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [planOpen, setPlanOpen] = useState(false);
  const [openActionIndex, setOpenActionIndex] = useState(null);

  const [showView, setShowView] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  /* 🔹 READ URL PARAMS */
  const [searchParams] = useSearchParams();
  const planFromUrl = searchParams.get("plan");
  const typeFromUrl = searchParams.get("type");

  /* 🔹 FETCH MEMBERS (JWT SAFE) */
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/members?search=${search}`
      );
      setMembers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Fetch members failed:", error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [search]);

  /* 🔹 URL PLAN SYNC */
  useEffect(() => {
    if (planFromUrl) setPlanFilter(planFromUrl);
  }, [planFromUrl]);

  /* 🔹 FILTER LOGIC */
  useEffect(() => {
    let data = [...members];

    if (planFilter !== "all") {
      data = data.filter(
        (m) =>
          m.plan === planFilter ||
          m.plan?.name === planFilter
      );
    }

    if (typeFromUrl === "active") {
      data = data.filter(
        (m) => m.status === "Active"
      );
    }

    setFilteredMembers(data);
  }, [members, planFilter, typeFromUrl]);

  /* 🔹 CLOSE ACTION DROPDOWN */
  useEffect(() => {
    const close = () => setOpenActionIndex(null);
    document.addEventListener("click", close);
    return () =>
      document.removeEventListener("click", close);
  }, []);

  /* 🔹 DELETE MEMBER */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await axiosInstance.delete(`/members/${id}`);
      setMembers((prev) =>
        prev.filter((m) => m._id !== id)
      );
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  /* 🔹 EXPORT CSV */
  const exportToCSV = () => {
    if (!filteredMembers.length) return;

    const headers = [
      "Name",
      "Phone",
      "Email",
      "Plan",
      "RFID",
      "Expiry Date",
      "Status",
    ];

    const rows = filteredMembers.map((m) => [
      m.fullName || m.name || "",
      m.phone || "",
      m.email || "",
      m.plan?.name || m.plan || "",
      m.rfid || "",
      formatDate(m.expiryDate || m.endDate),
      m.status || "",
    ]);

    const csv =
      headers.join(",") +
      "\n" +
      rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "members.csv";
    a.click();
    URL.revokeObjectURL(url);
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

        <button
          className="export-btn"
          onClick={exportToCSV}
        >
          <FiDownload /> Export List
        </button>
      </div>

      {/* TOOLBAR */}
      <div className="members-toolbar">
        <div className="search-box">
          <FiSearch />
          <input
            placeholder="Search by name, phone, or RFID..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* PLAN FILTER */}
        <div className="filter-dropdown">
          <div
            className="filter-selected"
            onClick={() => setPlanOpen(!planOpen)}
          >
            {planFilter === "all"
              ? "All Plans"
              : planFilter}
            <span
              className={`dropdown-icon ${
                planOpen ? "open" : ""
              }`}
            >
              ▾
            </span>
          </div>

          {planOpen && (
            <div className="filter-options">
              {[
                "All Plans",
                "Monthly",
                "Quarterly",
                "Half Yearly",
                "Yearly",
              ].map((p) => (
                <div
                  key={p}
                  className={`filter-option ${
                    planFilter === p ? "active" : ""
                  }`}
                  onClick={() => {
                    setPlanFilter(
                      p === "All Plans" ? "all" : p
                    );
                    setPlanOpen(false);
                  }}
                >
                  {p}
                </div>
              ))}
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
          <span>RFID</span>
          <span>Expiry</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : filteredMembers.length === 0 ? (
          <p className="loading">No members found</p>
        ) : (
          filteredMembers.map((m, i) => (
            <div className="table-row" key={m._id}>
              <div className="member">
                <div className="avatar">
                  {m.photo ? (
                    <img src={m.photo} alt="" />
                  ) : (
                    (m.fullName || m.name)?.charAt(0)
                  )}
                </div>
                <span>{m.fullName || m.name}</span>
              </div>

              <div className="contact">
                <span>{m.phone}</span>
                <small>{m.email}</small>
              </div>

              <span>{m.plan?.name || m.plan}</span>
              <span>{m.rfid || "-"}</span>
              <span>{formatDate(m.expiryDate || m.endDate)}</span>

              <span
                className={`status ${m.status?.toLowerCase()}`}
              >
                {m.status}
              </span>

              <div
                className="action-wrapper"
                onClick={(e) => e.stopPropagation()}
              >
                <FiMoreVertical
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
