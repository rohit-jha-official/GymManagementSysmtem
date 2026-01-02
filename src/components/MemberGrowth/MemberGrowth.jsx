import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./MemberGrowth.css";

const yearData = [
  { month: "Jan", members: 0 },
  { month: "Feb", members: 0 },
  { month: "Mar", members: 0 },
  { month: "Apr", members: 0 },
  { month: "May", members: 0 },
  { month: "Jun", members: 0 },
  { month: "Jul", members: 0 },
  { month: "Aug", members: 0 },
  { month: "Sep", members: 0 },
  { month: "Oct", members: 0 },
  { month: "Nov", members: 0 },
  { month: "Dec", members: 0 },
];

const monthData = [
  { week: "W1", members: 0 },
  { week: "W2", members: 0 },
  { week: "W3", members: 0 },
  { week: "W4", members: 0 },
];

const MemberGrowth = () => {
  const [view, setView] = useState("year");

  return (
    <div className="member-growth">
      {/* HEADER */}
      <div className="growth-header">
        <div>
          <h3>Member Growth</h3>
          <p>Monthly membership trend</p>
        </div>

        <div className="toggle">
          <button
            className={view === "year" ? "active" : ""}
            onClick={() => setView("year")}
          >
            Year
          </button>
          <button
            className={view === "month" ? "active" : ""}
            onClick={() => setView("month")}
          >
            Month
          </button>
        </div>
      </div>

      {/* CHART */}
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={view === "year" ? yearData : monthData}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff8a00" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#ff8a00" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey={view === "year" ? "month" : "week"}
              stroke="#9ca3af"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9ca3af"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#11151c",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey="members"
              stroke="#ff8a00"
              strokeWidth={3}
              fill="url(#colorGrowth)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MemberGrowth;