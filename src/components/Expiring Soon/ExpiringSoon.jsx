import "./ExpiringSoon.css";

const members = [
  {
    name: "Ahmed Hassan",
    phone: "0300-1234567",
    plan: "Monthly",
    days: 1,
    initial: "A",
  },
  {
    name: "Fatima Zahra",
    phone: "0321-9876543",
    plan: "3 Months",
    days: 2,
    initial: "F",
  },
  {
    name: "Ali Raza",
    phone: "0333-5678901",
    plan: "Monthly",
    days: 3,
    initial: "A",
  },
  {
    name: "Ayesha Khan",
    phone: "0345-2345678",
    plan: "6 Months",
    days: 5,
    initial: "A",
  },
];

const getColor = (days) => {
  if (days <= 1) return "danger";
  if (days <= 3) return "warning";
  return "success";
};

const ExpiringSoon = () => {
  return (
    <div className="expiring-card">
      {/* Header */}
      <div className="expiring-header">
        <div>
          <h3>Expiring Soon</h3>
          <p>Next 7 days</p>
        </div>
        <span className="view-all">View All →</span>
      </div>

      {/* List */}
      <div className="expiring-list">
        {members.map((m, index) => (
          <div className="expiring-item" key={index}>
            <div className="left">
              <div className="avatar">{m.initial}</div>
              <div>
                <h4>{m.name}</h4>
                <span>{m.phone}</span>
              </div>
            </div>

            <div className="right">
              <div className="plan">{m.plan}</div>
              <div className={`days ${getColor(m.days)}`}>
                {m.days} day{m.days > 1 && "s"}
              </div>
              <button className="renew-btn">Renew</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpiringSoon;
