import Member from "../models/member.js";


/* ================================
   📊 DASHBOARD STATS
================================ */
export const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    /* 👥 TOTAL MEMBERS */
    const totalMembers = await Member.countDocuments();

    /* 🆕 NEW MEMBERS THIS MONTH */
    const newRegistrations = await Member.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    /* 💰 MONTHLY REVENUE (NEW + RENEWALS) */
    const revenueMembers = await Member.find({
      $or: [
        { createdAt: { $gte: startOfMonth } },
        { isRenewed: true, updatedAt: { $gte: startOfMonth } },
      ],
    }).populate("plan");

    let totalRevenue = 0;
    revenueMembers.forEach(m => {
      if (m.plan?.price) totalRevenue += m.plan.price;
    });

    /* 🔁 RENEWAL RATE */
    const renewedMembers = await Member.countDocuments({
      isRenewed: true,
    });

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
   📈 YEARLY MEMBER GROWTH (JAN–DEC)
================================ */
export const getMemberGrowth = async (req, res) => {
  try {
    const year = new Date().getFullYear();

    const growth = await Member.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
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
    growth.forEach(item => {
      monthlyData[item._id - 1] = item.count;
    });

    res.json(monthlyData);
  } catch (err) {
    console.error("Yearly Growth Error:", err);
    res.status(500).json({ message: "Yearly growth failed" });
  }
};

/* ================================
   📆 MONTHLY MEMBER GROWTH (W1–W4)
================================ */
export const getMonthlyGrowth = async (req, res) => {
  try {
    const now = new Date();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    );

    const data = await Member.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
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

    data.forEach(item => {
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
