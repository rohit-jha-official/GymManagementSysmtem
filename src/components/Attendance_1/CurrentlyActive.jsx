import "./CurrentlyActive.css";

const CurrentlyActive = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="currently-active-page">
      {/* HEADER */}
      <div className="currently-active-header">
        <div>
          <h1>Currently Active</h1>
          <p>Members currently inside the gym</p>
        </div>

        {/* DATE (RIGHT TOP) */}
        <div className="page-date">{today}</div>
      </div>

      {/* TABLE CARD */}
      <div className="active-card">
        <table className="active-table">
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
              <td className="member-name">Usman Malik</td>
              <td className="rfid">RF-005</td>
              <td className="checkin-time">07:30 AM</td>
              <td>
                <span className="status active">Active</span>
              </td>
            </tr>

            <tr>
              <td className="member-name">Hassan Ahmed</td>
              <td className="rfid">RF-007</td>
              <td className="checkin-time">08:30 AM</td>
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

export default CurrentlyActive;
