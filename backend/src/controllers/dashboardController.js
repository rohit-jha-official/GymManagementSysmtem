import Member from "../models/member.js";
import mongoose from "mongoose";
/* ================================
   📊 DASHBOARD STATS (BRANCH-WISE)
================================ */
export const getDashboardStats = async (req, res) => {
  try {
    const branchId =  new mongoose.Types.ObjectId(req.user.branchId);

    const now = new Date();
    const startOfMonth = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), 1, 0, 0, 0)
    );

    /* 👥 TOTAL MEMBERS */
    const totalMembers = await Member.countDocuments({ branchId });

    /* 🆕 NEW REGISTRATIONS (THIS MONTH) */
    const newRegistrations = await Member.countDocuments({
      branchId,
      createdAt: { $gte: startOfMonth },
    });

    /* 💰 TOTAL REVENUE (NEW + RENEWAL + DUE) */
    const revenueAgg = await Member.aggregate([
      { $match: { branchId } },
      { $unwind: "$payments" },
      {
        $match: {
          "payments.date": { $gte: startOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$payments.amount" },
        },
      },
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;

    /* 🔁 RENEWALS THIS MONTH */
    const renewalAgg = await Member.aggregate([
      { $match: { branchId } },
      { $unwind: "$payments" },
      {
        $match: {
          "payments.type": "renewal",
          "payments.date": { $gte: startOfMonth },
        },
      },
      {
        $group: {
          _id: "$_id", // one per member
        },
      },
    ]);

    const renewedMembers = renewalAgg.length;

    const renewalRate =
      totalMembers === 0
        ? 0
        : Math.round((renewedMembers / totalMembers) * 100);

    res.json({
      totalMembers,
      newRegistrations,
      totalRevenue,
      renewalRate,
    });
  } catch (err) {
    console.error("Dashboard Stats Error:", err);
    res.status(500).json({ message: "Dashboard stats failed" });
  }
};

/* ================================
   📈 YEARLY MEMBER GROWTH
================================ */
export const getMemberGrowth = async (req, res) => {
  try {
    const branchId =  new mongoose.Types.ObjectId(req.user.branchId);
    const year = new Date().getFullYear();

    const growth = await Member.aggregate([
      {
        $match: {
          branchId,
          createdAt: {
            $gte: new Date(Date.UTC(year, 0, 1)),
            $lte: new Date(Date.UTC(year, 11, 31, 23, 59, 59)),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const monthlyData = Array(12).fill(0);
    growth.forEach((item) => {
      monthlyData[item._id - 1] = item.count;
    });

    res.json(monthlyData);
  } catch (err) {
    console.error("Yearly Growth Error:", err);
    res.status(500).json({ message: "Yearly growth failed" });
  }
};

/* ================================
   📆 MONTHLY MEMBER GROWTH
================================ */
export const getMonthlyGrowth = async (req, res) => {
  try {
    const branchId =  new mongoose.Types.ObjectId(req.user.branchId);
    const now = new Date();

    const startOfMonth = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), 1)
    );
    const endOfMonth = new Date(
      Date.UTC(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
    );

    const data = await Member.aggregate([
      {
        $match: {
          branchId,
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $project: {
          week: {
            $ceil: {
              $divide: [{ $dayOfMonth: "$createdAt" }, 7],
            },
          },
        },
      },
      {
        $group: {
          _id: "$week",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const weeklyData = [
      { week: "W1", members: 0 },
      { week: "W2", members: 0 },
      { week: "W3", members: 0 },
      { week: "W4", members: 0 },
    ];

    data.forEach((item) => {
      if (item._id >= 1 && item._id <= 4) {
        weeklyData[item._id - 1].members = item.count;
      }
    });

    res.json(weeklyData);
  } catch (err) {
    console.error("Monthly Growth Error:", err);
    res.status(500).json({ message: "Monthly growth failed" });
  }
};
