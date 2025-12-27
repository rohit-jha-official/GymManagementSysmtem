import "./CurrentlyActive.css";

const ActiveMembers = () => {
  return (
    <div className="attendance-details-page">
      <div className="attendance-details-header">
        <h1>Currently Active</h1>
        <p>Members currently inside the gym</p>
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
              <td>Usman Malik</td>
              <td>RF-005</td>
              <td>07:30 AM</td>
              <td>
                <span className="status active">Active</span>
              </td>
            </tr>

            <tr>
              <td>Hassan Ahmed</td>
              <td>RF-007</td>
              <td>08:30 AM</td>
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

export default ActiveMembers;
