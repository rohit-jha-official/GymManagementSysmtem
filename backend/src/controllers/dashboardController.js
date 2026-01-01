import Member from "../models/member.js";

/**
 * 📊 GET DASHBOARD STATS
 * GET /api/dashboard/stats
 */
export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();

    /* ✅ Total Members */
    const totalMembers = await Member.countDocuments();

    /* ✅ Expiring in next 7 days */
    const expiringSoon = await Member.countDocuments({
      expiryDate: {
        $gte: today,
        $lte: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    /* ✅ New registrations this month */
    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const newRegistrations = await Member.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    res.json({
      totalMembers,
      expiringSoon,
      newRegistrations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
