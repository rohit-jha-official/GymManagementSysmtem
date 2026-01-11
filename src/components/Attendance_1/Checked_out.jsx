import "./Checked_out.css";

const Checked_out= () => {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="checked-out-page">
      {/* HEADER */}
      <div className="checked-out-header">
        <div>
          <h1>Checked Out</h1>
          <p>Members who have completed their session</p>
        </div>

        {/* DATE (RIGHT SIDE) */}
        <div className="page-date">{today}</div>
      </div>

      {/* TABLE CARD */}
      <div className="checkedout-card">
        <table className="checkedout-table">
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
                <span className="status checkedout">Checked Out</span>
              </td>
            </tr>

            <tr>
              <td className="member-name">Ayesha Khan</td>
              <td className="rfid">RF-004</td>
              <td className="checkin-time">09:00 AM</td>
              <td>
                <span className="status checkedout">Checked Out</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Checked_out;
