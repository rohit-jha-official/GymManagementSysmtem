import Activity from "../models/activity.js";
import Member from "../models/member.js";
import mongoose from "mongoose";

/* ================================
   📋 GET RECENT ACTIVITY (BRANCH-WISE)
================================ */
export const getRecentActivity = async (req, res) => {
  try {
    const branchId = new mongoose.Types.ObjectId(req.user.branchId);

    const today = new Date();
    const next3Days = new Date();
    next3Days.setDate(today.getDate() + 3);

    /* 🔹 STORED ACTIVITIES */
    const storedActivities = await Activity.find({ branchId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    /* 🔹 DYNAMIC EXPIRY ALERTS */
    const expiringMembers = await Member.find({
      branchId,
      expiryDate: { $gte: today, $lte: next3Days },
    }).lean();

    const expiryActivities = expiringMembers.map((m) => ({
      _id: `expiry-${m._id}`,
      type: "expiry",
      message: `Membership expiring: ${m.fullName} (${Math.ceil(
        (new Date(m.expiryDate) - today) / (1000 * 60 * 60 * 24)
      )} days)`,
      createdAt: m.expiryDate,
      isDynamic: true,
    }));

    /* 🔹 MERGE & SORT */
    const merged = [...storedActivities, ...expiryActivities]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    res.json(merged);
  } catch (error) {
    console.error("Recent activity error:", error);
    res.status(500).json({ message: "Failed to fetch recent activity" });
  }
};

/* ================================
   ❌ DELETE ACTIVITY (BRANCH SAFE)
================================ */
export const deleteActivity = async (req, res) => {
  try {
    const branchId = new mongoose.Types.ObjectId(req.user.branchId);
    const { id } = req.params;

    // Prevent deleting dynamic expiry alerts
    if (id.startsWith("expiry-")) {
      return res.status(400).json({ message: "Cannot delete system alerts" });
    }

    const activity = await Activity.findOneAndDelete({
      _id: id,
      branchId,
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error("Delete activity error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};
