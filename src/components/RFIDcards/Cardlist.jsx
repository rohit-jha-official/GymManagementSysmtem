import "./Cardlist.css";

export default function Cardlist() {
  return (
    <div className="rfid-page">
      {/* Header */}
      <div className="rfid-header">
        <div>
          <h2>RFID Cards</h2>
          <p>Manage member RFID card assignments</p>
        </div>
        <button className="issue-btn">+ Issue New Card</button>
      </div>

      {/* Stats */}
      <div className="rfid-stats">
        <div className="stat-card">
          <span className="stat-icon green">💳</span>
          <div>
            <h3>4</h3>
            <p>Active Cards</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon red">💳</span>
          <div>
            <h3>1</h3>
            <p>Lost Cards</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon gray">💳</span>
          <div>
            <h3>1</h3>
            <p>Inactive Cards</p>
          </div>
        </div>
      </div>

      {/* Card List */}
      <div className="cardlist-box">
        <h3>Card List</h3>
        <p className="subtext">All RFID cards and their assignments</p>

        <input
          type="text"
          placeholder="Search by card number or member..."
          className="search-input"
        />

        <table>
          <thead>
            <tr>
              <th>Card ID</th>
              <th>Card Number</th>
              <th>Member</th>
              <th>Member ID</th>
              <th>Status</th>
              <th>Assigned Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>RFID-001</td>
              <td>4532-1234-5678-9012</td>
              <td>Rahul Sharma</td>
              <td>MEM001</td>
              <td><span className="badge active">active</span></td>
              <td>2024-01-15</td>
              <td className="action">View</td>
            </tr>

            <tr>
              <td>RFID-002</td>
              <td>4532-2345-6789-0123</td>
              <td>Priya Patel</td>
              <td>MEM002</td>
              <td><span className="badge active">active</span></td>
              <td>2024-01-20</td>
              <td className="action">View</td>
            </tr>

            <tr>
              <td>RFID-003</td>
              <td>4532-3456-7890-1234</td>
              <td>Amit Kumar</td>
              <td>MEM003</td>
              <td><span className="badge lost">lost</span></td>
              <td>2024-02-01</td>
              <td className="action replace">Replace</td>
            </tr>

            <tr>
              <td>RFID-004</td>
              <td>4532-4567-8901-2345</td>
              <td>Neha Singh</td>
              <td>MEM004</td>
              <td><span className="badge active">active</span></td>
              <td>2024-02-10</td>
              <td className="action">View</td>
            </tr>

            <tr>
              <td>RFID-005</td>
              <td>4532-5678-9012-3456</td>
              <td>Vikram Reddy</td>
              <td>MEM005</td>
              <td><span className="badge inactive">inactive</span></td>
              <td>2024-02-15</td>
              <td className="action">View</td>
            </tr>

            <tr>
              <td>RFID-006</td>
              <td>4532-6789-0123-4567</td>
              <td>Anjali Gupta</td>
              <td>MEM006</td>
              <td><span className="badge active">active</span></td>
              <td>2024-03-01</td>
              <td className="action">View</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
