import Activity from "../models/activity.js";
import Member from "../models/member.js";

/**
 * 📋 GET RECENT ACTIVITY (BRANCH-WISE)
 * GET /api/activity/recent
 */
export const getRecentActivity = async (req, res) => {
  try {
    const today = new Date();
    const next3Days = new Date();
    next3Days.setDate(today.getDate() + 3);

    /* 🔹 STORED ACTIVITIES (ONLY THIS BRANCH) */
    const activities = await Activity.find({
      branchId: req.branchId,
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    /* 🔹 DYNAMIC EXPIRY ACTIVITIES (ONLY THIS BRANCH) */
    const expiringMembers = await Member.find({branchId: req.user.branchId,
      expiryDate: { $gte: today, $lte: next3Days },
    }).lean();

    const expiryActivities = expiringMembers.map((m) => ({
      type: "expiry",
      message: `Membership expiring: ${m.fullName} (${Math.ceil(
        (new Date(m.expiryDate) - today) / (1000 * 60 * 60 * 24)
      )} days)`,
      createdAt: m.expiryDate,
      isDynamic: true,
    }));

    const merged = [...activities, ...expiryActivities]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    res.json(merged);
  } catch (error) {
    console.error("Activity fetch failed:", error);
    res.status(500).json({ message: "Activity fetch failed" });
  }
};

/**
 * ❌ DELETE ACTIVITY (BRANCH-SAFE)
 * DELETE /api/activity/:id
 */
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await Activity.findOneAndDelete({
      _id: id,
      branchId: req.user.branchId,
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json({ message: "Activity deleted" });
  } catch (error) {
    console.error("Delete activity failed:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};
