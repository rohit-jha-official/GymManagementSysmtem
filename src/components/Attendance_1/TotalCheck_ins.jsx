import "./TotalCheck_ins.css";

const TotalCheck_ins = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="total-checkins-page">
      {/* HEADER */}
      <div className="total-checkins-header">
        <div>
          <h1>Total Check-ins</h1>
          <p>All members checked in today</p>
        </div>

        {/* DATE (RIGHT TOP) */}
        <div className="page-date">{today}</div>
      </div>

      {/* TABLE CARD */}
      <div className="checkins-card">
        <table className="checkins-table">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>RFID</th>
              <th>Check In</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="member-name">Ahmed Hassan</td>
              <td className="rfid">RF-001</td>
              <td className="checkin-time">06:15 AM</td>
              <td>
                <span className="status completed">Completed</span>
              </td>
            </tr>

            <tr>
              <td className="member-name">Fatima Zahra</td>
              <td className="rfid">RF-002</td>
              <td className="checkin-time">06:45 AM</td>
              <td>
                <span className="status active">Active</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalCheck_ins;
