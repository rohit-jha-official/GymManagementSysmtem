import "./Attendance_1.css";
import "./TotalCheck_ins.css";
import "./CurrentlyActive.css";
import "./Checked_out.css";
import { useNavigate } from "react-router-dom";

/* ================= DATA ================= */
const attendanceData = [
  {
    name: "Ahmed Hassan",
    rfid: "RF-001",
    checkIn: "06:15 AM",
    checkOut: "08:30 AM",
    duration: "2h 15m",
    status: "Completed",
  },
  {
    name: "Fatima Zahra",
    rfid: "RF-002",
    checkIn: "06:45 AM",
    checkOut: "08:00 AM",
    duration: "1h 15m",
    status: "Completed",
  },
  {
    name: "Ali Raza",
    rfid: "RF-003",
    checkIn: "07:00 AM",
    checkOut: "09:15 AM",
    duration: "2h 15m",
    status: "Completed",
  },
  {
    name: "Usman Malik",
    rfid: "RF-005",
    checkIn: "07:30 AM",
    checkOut: "-",
    duration: "-",
    status: "Active",
  },
  {
    name: "Sara Ali",
    rfid: "RF-006",
    checkIn: "08:00 AM",
    checkOut: "10:00 AM",
    duration: "2h 00m",
    status: "Completed",
  },
  {
    name: "Hassan Ahmed",
    rfid: "RF-007",
    checkIn: "08:30 AM",
    checkOut: "-",
    duration: "-",
    status: "Active",
  },
  {
    name: "Ayesha Khan",
    rfid: "RF-004",
    checkIn: "09:00 AM",
    checkOut: "11:30 AM",
    duration: "2h 30m",
    status: "Completed",
  },
  {
    name: "Kamran Ali",
    rfid: "RF-010",
    checkIn: "09:45 AM",
    checkOut: "-",
    duration: "-",
    status: "Active",
  },
];

/*  DATE */
const getFormattedDate = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/* COMPONENT */
const Attendance = () => {
  const navigate = useNavigate();

  const totalCheckins = attendanceData.length;
  const activeCount = attendanceData.filter(i => i.status === "Active").length;
  const checkedOutCount = totalCheckins - activeCount;

  return (
    <div className="attendance-page">
      {/* HEADER */}
      <div className="attendance-header">
        <h1>Today's Attendance</h1>
        <p>{getFormattedDate()}</p>
      </div>

      {/* STATS */}
      <div className="attendance-stats">
        <div className="stat-card" onClick={() => navigate("/attendance/total-checkins")}>
          <div>
            <span>Total Check-ins</span>
            <h2>{totalCheckins}</h2>
          </div>
          <div className="stat-icon green">👥</div>
        </div>

        <div className="stat-card" onClick={() => navigate("/attendance/active")}>
          <div>
            <span>Currently Active</span>
            <h2>{activeCount}</h2>
          </div>
          <div className="stat-icon orange">⏱</div>
        </div>

        <div className="stat-card" onClick={() => navigate("/attendance/checked-out")}>
          <div>
            <span>Checked Out</span>
            <h2>{checkedOutCount}</h2>
          </div>
          <div className="stat-icon gray">🚪</div>
        </div>
      </div>

      {/* TABLE */}
      <div className="attendance-table-wrapper">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>RFID</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {attendanceData.map((item, index) => (
              <tr key={index}>
                <td className="member-cell">
                  <div className="avatar">{item.name[0]}</div>
                  <span>{item.name}</span>
                </td>
                <td>{item.rfid}</td>
                <td>{item.checkIn}</td>
                <td>{item.checkOut}</td>
                <td>{item.duration}</td>
                <td>
                  <span className={`status ${item.status === "Active" ? "active" : "completed"}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
