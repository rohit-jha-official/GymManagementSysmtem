import "./Checked_out.css";

const CheckedOutMembers = () => {
  return (
    <div className="attendance-details-page">
      <div className="attendance-details-header">
        <h1>Checked Out</h1>
        <p>Members who have completed their session</p>
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
              <td>Ayesha Khan</td>
              <td>RF-004</td>
              <td>09:00 AM</td>
              <td>
                <span className="status completed">Completed</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckedOutMembers;
