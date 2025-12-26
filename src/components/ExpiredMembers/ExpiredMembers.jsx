import "./ExpiredMembers.css";

const expiredMembers = [
  {
    name: "Ali Raza",
    phone: "0333-5678901",
    email: "ali@email.com",
    plan: "Monthly",
    expiredOn: "2024-11-20",
    days: 16,
  },
  {
    name: "Zainab Bibi",
    phone: "0333-7778899",
    email: "zainab@email.com",
    plan: "Monthly",
    expiredOn: "2024-11-01",
    days: 35,
  },
  {
    name: "Imran Khan",
    phone: "0345-1234567",
    email: "imran@email.com",
    plan: "3 Months",
    expiredOn: "2024-10-15",
    days: 52,
  },
  {
    name: "Sana Malik",
    phone: "0300-9998877",
    email: "sana@email.com",
    plan: "Monthly",
    expiredOn: "2024-11-10",
    days: 26,
  },
  {
    name: "Bilal Ahmed",
    phone: "0321-5556677",
    email: "bilal@email.com",
    plan: "6 Months",
    expiredOn: "2024-10-01",
    days: 65,
  },
];

export default function ExpiredMembers() {
  return (
    <div className="expired-page">
      <div className="expired-header">
        <h2>Expired Members</h2>
        <p>{expiredMembers.length} members with expired memberships</p>
      </div>

      <div className="expired-table">
        <div className="table-head">
          <span>Member</span>
          <span>Contact</span>
          <span>Plan</span>
          <span>Expired On</span>
          <span>Days</span>
          <span>Action</span>
        </div>

        {expiredMembers.map((m, i) => (
          <div className="table-row" key={i}>
            <div className="member-name">{m.name}</div>

            <div>
              <div>{m.phone}</div>
              <small>{m.email}</small>
            </div>

            <div>{m.plan}</div>
            <div>{m.expiredOn}</div>

            <div className="days-expired">{m.days} days</div>

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
