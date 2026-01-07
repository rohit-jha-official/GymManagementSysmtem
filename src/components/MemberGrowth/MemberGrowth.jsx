import { useState, useEffect } from "react";
import axios from "axios";
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
import { API_BASE } from "../../config/api";

/* LABELS */
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MemberGrowth = () => {
  const [view, setView] = useState("year");
  const [yearData, setYearData] = useState([]);
  const [monthData, setMonthData] = useState([]);

  /* 📊 FETCH YEARLY GROWTH (JAN–DEC) */
  useEffect(() => {
    const fetchYearGrowth = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/dashboard/member-growth`
        );

        const formatted = res.data.map((count, index) => ({
          month: months[index],
          members: count,
        }));

        setYearData(formatted);
      } catch (err) {
        console.error("Year growth fetch failed", err);
      }
    };

    fetchYearGrowth();
  }, []);

  /* 📆 FETCH MONTHLY GROWTH (W1–W4) */
  useEffect(() => {
    if (view === "month") {
      const fetchMonthGrowth = async () => {
        try {
          const res = await axios.get(
            `${API_BASE}/dashboard/member-growth/month`
          );
          setMonthData(res.data);
        } catch (err) {
          console.error("Month growth fetch failed", err);
        }
      };

      fetchMonthGrowth();
    }
  }, [view]);

  return (
    <div className="member-growth">
      {/* HEADER */}
      <div className="growth-header">
        <div>
          <h3>Member Growth</h3>
          <p>Membership trend analysis</p>
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
              allowDecimals={false}
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
