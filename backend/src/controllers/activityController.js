import Activity from "../models/activity.js";
import Member from "../models/member.js";

export const getRecentActivity = async (req, res) => {
  try {
    const today = new Date();
    const next3Days = new Date();
    next3Days.setDate(today.getDate() + 3);

    // 🔹 Stored activities
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(10);

    // 🔹 Expiring members (dynamic)
    const expiringMembers = await Member.find({
      expiryDate: { $gte: today, $lte: next3Days },
    });

    const expiryActivities = expiringMembers.map((m) => ({
      type: "expiry",
      message: `Membership expiring: ${m.fullName} (${Math.ceil(
        (m.expiryDate - today) / (1000 * 60 * 60 * 24)
      )} days)`,
      createdAt: m.expiryDate,
    }));

    const merged = [...activities, ...expiryActivities]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    res.json(merged);
  } catch (error) {
    res.status(500).json({ message: "Activity fetch failed" });
  }
};
