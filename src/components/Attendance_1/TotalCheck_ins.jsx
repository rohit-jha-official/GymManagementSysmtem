import "./TotalCheck_ins.css";

const TotalCheckins = () => {
  return (
    <div className="attendance-details-page">
      <div className="attendance-details-header">
        <h1>Total Check-ins</h1>
        <p>All members checked in today</p>
      </div>

      <div className="attendance-details-table-wrapper">
        <table className="attendance-details-table">
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
              <td>Ahmed Hassan</td>
              <td>RF-001</td>
              <td>06:15 AM</td>
              <td>
                <span className="status completed">Completed</span>
              </td>
            </tr>

            <tr>
              <td>Usman Malik</td>
              <td>RF-005</td>
              <td>07:30 AM</td>
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

export default TotalCheckins;
