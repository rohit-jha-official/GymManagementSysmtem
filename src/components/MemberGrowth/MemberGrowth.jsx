import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
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

/* MONTH LABELS */
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MemberGrowth = () => {
  const [view, setView] = useState("year");
  const [yearData, setYearData] = useState([]);
  const [monthData, setMonthData] = useState([]);

  /* 📊 YEARLY GROWTH */
  useEffect(() => {
    const fetchYearGrowth = async () => {
      try {
        const res = await axiosInstance.get("/dashboard/member-growth");

        const raw = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        const formatted = raw.map((count, index) => ({
          month: months[index],
          members: count,
        }));

        setYearData(formatted);
      } catch (err) {
        console.error("Year growth fetch failed", err);
        setYearData([]);
      }
    };

    fetchYearGrowth();
  }, []);

  /* 📆 MONTHLY GROWTH */
  useEffect(() => {
    if (view !== "month") return;

    const fetchMonthGrowth = async () => {
      try {
        const res = await axiosInstance.get(
          "/dashboard/member-growth/month"
        );

        const list = Array.isArray(res.data) ? res.data : [];
        setMonthData(list);
      } catch (err) {
        console.error("Month growth fetch failed", err);
        setMonthData([]);
      }
    };

    fetchMonthGrowth();
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
        <ResponsiveContainer width="100%" height={300}>
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
