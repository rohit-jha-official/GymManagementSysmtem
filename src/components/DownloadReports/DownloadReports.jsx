import "./DownloadReports.css";
import React, { useState } from "react";
import {
  FaFileExcel,
  FaFilePdf,
  FaDownload,
} from "react-icons/fa";

const DownloadReports = () => {
    const [open, setOpen] = useState(false);
  const [reportType, setReportType] = useState("Select type");

  // 🔹 OPTIONS LIST
  const options = [
    "Daily Summary",
    "Weekly Summary",
    "Monthly Summary",
    "Detailed Report",
  ];
  return (
    <div className="download-reports-page">
      {/* HEADER */}
      <div className="page-header">
        <h1>Download Reports</h1>
        <p>Generate and download attendance reports</p>
      </div>

      {/* CONFIGURE REPORT */}
      <div className="card">
        <h3 className="card-title">Configure Report</h3>

        <div className="form-grid">
          <div className="date">
            <label>From Date</label>
            <input type="date" />
          </div>

          <div className="date">
            <label>To Date</label>
            <input type="date" />
          </div>

                    <div className="dropdown">
                        <label>Report Type</label>
                            <div
                                className={`dropdown-header ${open ? "active" : ""}`}
                                onClick={() => setOpen(!open)}
                            >
                                {reportType}
                                <span className="arrow">▾</span>
                            </div>

                            {open && (
                                <ul className="dropdown-list">
                                {options.map((opt) => (
                                    <li
                                    key={opt}
                                    onClick={() => {
                                        setReportType(opt);
                                        setOpen(false);
                                    }}
                                    >
                                    {opt}
                                    </li>
                                ))}
                                </ul>
                            )}
                            </div>

        </div>
      </div>

      {/* DOWNLOAD OPTIONS */}
      <div className="report-cards">
        {/* EXCEL */}
        <div className="card report-card">
          <div className="report-left">
            <div className="report-icon excel">
              <FaFileExcel />
            </div>
            <div>
              <h4>Excel Report</h4>
              <p>Download as .xlsx file</p>
            </div>
          </div>

          <button className="btn-success">
            <FaDownload /> Download
          </button>
        </div>

        {/* PDF */}
        <div className="card report-card">
          <div className="report-left">
            <div className="report-icon pdf">
              <FaFilePdf />
            </div>
            <div>
              <h4>PDF Report</h4>
              <p>Download as .pdf file</p>
            </div>
          </div>

          <button className="btn-danger-outline">
            <FaDownload /> Download
          </button>
        </div>
      </div>

      {/* QUICK REPORTS */}
      <div className="card">
        <h3 className="card-title">Quick Reports</h3>

        <div className="quick-grid">
          <div className="quick-card">
            <h4>Today</h4>
            <span>Daily Report</span>
          </div>

          <div className="quick-card">
            <h4>This Week</h4>
            <span>Weekly Report</span>
          </div>

          <div className="quick-card">
            <h4>This Month</h4>
            <span>Monthly Report</span>
          </div>

          <div className="quick-card">
            <h4>Last 3 Months</h4>
            <span>Quarterly Report</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadReports;
