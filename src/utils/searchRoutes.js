export const searchRoutes = [
  { label: "Dashboard", keywords: ["dashboard", "home"], path: "/dashboard" },

  { label: "All Members", keywords: ["members", "all members"], path: "/members" },
  { label: "Add New Member", keywords: ["add", "add member", "new member"], path: "/members/add" },
  { label: "Expired Members", keywords: ["expired", "expired members"], path: "/members/expired" },
  { label: "Expiring Soon", keywords: ["expiring", "expiring soon"], path: "/members/expiring" },

  { label: "Search Attendance", keywords: ["search attendance"], path: "/attendance/search" },
  { label: "Download Reports", keywords: ["reports", "download reports"], path: "/attendance/reports" },
  { label: "Today's Attendance", keywords: ["today", "today attendance"], path: "/attendance/today" },
  { label: "Total Check-ins", keywords: ["total", "checkins", "total checkins"], path: "/attendance/total-checkins" },
  { label: "Currently Active", keywords: ["active", "currently active"], path: "/attendance/active" },
  { label: "Checked Out Members", keywords: ["checked out", "checkout"], path: "/attendance/checked-out" },

  { label: "RFID Cards", keywords: ["rfid", "cards"], path: "/rfid" },
  { label: "Replace RFID", keywords: ["replace", "replace card"], path: "/rfid/replace" },

  { label: "Membership Plans", keywords: ["plan", "plans", "membership"], path: "/plan" },   // 🔥 IMPORTANT
  { label: "Due Payments", keywords: ["due", "due payments"], path: "/due" },                // 🔥 IMPORTANT

  { label: "Notifications", keywords: ["notifications"], path: "/notifications" },
  { label: "Settings", keywords: ["settings", "profile"], path: "/settings" },
];
