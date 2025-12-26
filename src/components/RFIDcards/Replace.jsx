import "./Replace.css";

export default function ReplaceCard() {
  return (
    <div className="replace-page">

      {/* PAGE HEADER */}
      <div className="page-title">
        <h2>Replace Lost Card</h2>
        <p>Issue replacement cards for lost or damaged RFID cards</p>
      </div>

      {/* ISSUE CARD */}
      <div className="card-box">
        <h3>🔄 Issue Replacement Card</h3>
        <p className="subtext">
          Search for a member and issue a new RFID card
        </p>

        {/* SEARCH */}
        <label>Search Member</label>
        <input
          type="text"
          placeholder="Enter member ID or name..."
          className="input"
        />

        {/* MEMBER INFO */}
        <div className="member-box">
          <div className="member-left">
            <div className="avatar">👤</div>
            <div>
              <h4>Amit Kumar</h4>
              <p>MEM003 · Monthly Plan</p>
              <p className="old-card">Old Card<br />4532-3456-7890-1234</p>
            </div>
          </div>

          <span className="status lost">Lost</span>
        </div>

        {/* NEW CARD */}
        <label>New Card Number</label>
        <input
          type="text"
          placeholder="Scan or enter new card number..."
          className="input"
        />

        {/* REASON */}
        <label>Reason for Replacement</label>
        <input
          type="text"
          placeholder="e.g. Card lost, Card damaged..."
          className="input"
        />

        {/* WARNING */}
        <div className="warning">
          ⚠ Replacement fee of ₹200 will be charged to the member
        </div>

        {/* BUTTON */}
        <button className="primary-btn">
          💳 Issue Replacement Card
        </button>
      </div>

      {/* PENDING */}
      <div className="card-box">
        <h3>Pending Replacements</h3>
        <p className="subtext">
          Cards reported lost and awaiting replacement
        </p>

        <div className="pending-item">
          <div>
            <h4>Amit Kumar</h4>
            <p>MEM003 · Reported: 2024-03-01</p>
            <span className="small-text">4532-3456-7890-1234</span>
          </div>
          <div className="right">
            <span className="badge pending">pending</span>
            <button className="mini-btn">Replace</button>
          </div>
        </div>

        <div className="pending-item">
          <div>
            <h4>Pooja Sharma</h4>
            <p>MEM008 · Reported: 2024-03-05</p>
            <span className="small-text">4532-8901-2345-6789</span>
          </div>
          <div className="right">
            <span className="badge pending">pending</span>
            <button className="mini-btn">Replace</button>
          </div>
        </div>

        <div className="pending-item">
          <div>
            <h4>Ravi Verma</h4>
            <p>MEM012 · Reported: 2024-02-20</p>
            <span className="small-text">4532-1234-5678-9012</span>
          </div>
          <div className="right">
            <span className="badge replaced">replaced</span>
          </div>
        </div>

      </div>
    </div>
  );
}
