import Activity from "../models/activity.js";
import Member from "../models/member.js";

/**
 * 📋 GET RECENT ACTIVITY
 * GET /api/activity/recent
 */
export const getRecentActivity = async (req, res) => {
  try {
    const today = new Date();
    const next3Days = new Date();
    next3Days.setDate(today.getDate() + 3);

    // 🔹 Stored activities (with _id)
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // 🔹 Dynamic expiry activities (NO _id)
    const expiringMembers = await Member.find({
      expiryDate: { $gte: today, $lte: next3Days },
    });

    const expiryActivities = expiringMembers.map((m) => ({
      type: "expiry",
      message: `Membership expiring: ${m.fullName} (${Math.ceil(
        (m.expiryDate - today) / (1000 * 60 * 60 * 24)
      )} days)`,
      createdAt: m.expiryDate,
      isDynamic: true, // 🔴 IMPORTANT FLAG
    }));

    const merged = [...activities, ...expiryActivities]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 10);

    res.json(merged);
  } catch (error) {
    res.status(500).json({ message: "Activity fetch failed" });
  }
};

/**
 * ❌ DELETE ACTIVITY (ONLY STORED)
 * DELETE /api/activity/:id
 */
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await Activity.findByIdAndDelete(id);

    if (!activity) {
      return res
        .status(404)
        .json({ message: "Activity not found" });
    }

    res.json({ message: "Activity deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
