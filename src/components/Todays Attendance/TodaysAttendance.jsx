import "./TodaysAttendance.css";
import { FiUserCheck, FiTrendingUp } from "react-icons/fi";

const data = [
  { time: "6-8 AM", value: 28 },
  { time: "8-10 AM", value: 42 },
  { time: "10-12 PM", value: 18 },
  { time: "12-2 PM", value: 12 },
  { time: "2-4 PM", value: 15 },
  { time: "4-6 PM", value: 35 },
  { time: "6-8 PM", value: 48 },
  { time: "8-10 PM", value: 22 },
];

const maxValue = Math.max(...data.map((d) => d.value));

const TodaysAttendance = () => {
  return (
    <div className="attendance-card">
      {/* HEADER */}
      <div className="attendance-header">
        <div className="header-left">
          <div className="attendance-icon">
            <FiUserCheck />
          </div>
          <div>
            <h3>Today's Attendance</h3>
            <p>By time slots</p>
          </div>
        </div>

        <div className="header-right">
          <FiTrendingUp />
          <span>220 check-ins</span>
        </div>
      </div>

      {/* BARS */}
      <div className="attendance-list">
        {data.map((item, index) => (
          <div className="attendance-row" key={index}>
            <span className="time">{item.time}</span>

            <div className="bar-wrapper">
              <div
                className="bar-fill"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>

            <span className="count">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysAttendance;
