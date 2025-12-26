import "./ExpiringSoon_1.css";

const expiringSoonMembers = [
  {
    name: "Ahmed Hassan",
    phone: "0300-1234567",
    plan: "Monthly",
    expiresOn: "2024-12-07",
    daysLeft: 1,
  },
  {
    name: "Fatima Zahra",
    phone: "0321-9876543",
    plan: "3 Months",
    expiresOn: "2024-12-08",
    daysLeft: 2,
  },
  {
    name: "Usman Malik",
    phone: "0312-8765432",
    plan: "Monthly",
    expiresOn: "2024-12-09",
    daysLeft: 3,
  },
  {
    name: "Ayesha Khan",
    phone: "0345-2345678",
    plan: "6 Months",
    expiresOn: "2024-12-10",
    daysLeft: 4,
  },
  {
    name: "Hassan Ahmed",
    phone: "0321-4445566",
    plan: "3 Months",
    expiresOn: "2024-12-11",
    daysLeft: 5,
  },
  {
    name: "Maria Bibi",
    phone: "0333-1122334",
    plan: "Monthly",
    expiresOn: "2024-12-12",
    daysLeft: 6,
  },
  {
    name: "Kamran Ali",
    phone: "0345-9988776",
    plan: "Monthly",
    expiresOn: "2024-12-13",
    daysLeft: 7,
  },
];

export default function ExpiringSoon() {
  return (
    <div className="expiring-page">
      <div className="expiring-header">
        <div>
          <h2>Expiring Soon</h2>
          <p>
            {expiringSoonMembers.length} memberships expiring in next 7 days
          </p>
        </div>

        <button className="reminder-btn">Send Reminders</button>
      </div>

      <div className="expiring-table">
        <div className="table-head">
          <span>Member</span>
          <span>Phone</span>
          <span>Plan</span>
          <span>Expires On</span>
          <span>Days Left</span>
          <span>Actions</span>
        </div>

        {expiringSoonMembers.map((m, i) => (
          <div className="table-row" key={i}>
            <div className="member-name">{m.name}</div>
            <div>{m.phone}</div>
            <div>{m.plan}</div>
            <div>{m.expiresOn}</div>

            <div className={`days-left d-${m.daysLeft}`}>
              {m.daysLeft} day{m.daysLeft > 1 ? "s" : ""}
            </div>

            <div className="actions">
              <button className="call-btn">Call</button>
              <button className="renew-btn">Renew</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
