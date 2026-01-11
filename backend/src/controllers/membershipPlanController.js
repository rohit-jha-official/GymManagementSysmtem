import MembershipPlan from "../models/membershipPlan.js";
import Member from "../models/member.js";

/* =====================================
   📋 GET ALL MEMBERSHIP PLANS
   ===================================== */
export const getPlans = async (req, res) => {
  try {
    // ✅ Sort plans by duration (short → long)
    const plans = await MembershipPlan.find()
      .sort({ durationDays: 1 })
      .lean(); // 🚀 faster read-only response

    const today = new Date();

    // ✅ Attach member counts to each plan
    const plansWithStats = await Promise.all(
      plans.map(async (plan) => {
        const [totalMembers, activeMembers] = await Promise.all([
          Member.countDocuments({ plan: plan._id }),
          Member.countDocuments({
            plan: plan._id,
            expiryDate: { $gte: today },
          }),
        ]);

        return {
          ...plan,
          totalMembers,
          activeMembers,
        };
      })
    );

    res.status(200).json(plansWithStats);
  } catch (error) {
    console.error("❌ Get plans error:", error);
    res.status(500).json({
      message: "Failed to fetch membership plans",
    });
  }
};

/* =====================================
   ➕ CREATE MEMBERSHIP PLAN
   ===================================== */
export const createPlan = async (req, res) => {
  try {
    const {
      name,
      price,
      durationDays,
      features = [],
      isPopular = false,
      isPremium = false,
    } = req.body;

    // ✅ Validation
    if (!name || !price || !durationDays) {
      return res.status(400).json({
        message: "name, price and durationDays are required",
      });
    }

    // ✅ Prevent duplicate plans
    const exists = await MembershipPlan.findOne({
      name: name.trim(),
    });

    if (exists) {
      return res.status(400).json({
        message: "Membership plan already exists",
      });
    }

    const plan = await MembershipPlan.create({
      name: name.trim(),
      price,
      durationDays,
      features,
      isPopular,
      isPremium,
    });

    res.status(201).json(plan);
  } catch (error) {
    console.error("❌ Create plan error:", error);
    res.status(500).json({
      message: "Failed to create membership plan",
    });
  }
};

/* =====================================
   ✏️ UPDATE MEMBERSHIP PLAN
   ===================================== */
export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const plan = await MembershipPlan.findById(id);

    if (!plan) {
      return res.status(404).json({
        message: "Membership plan not found",
      });
    }

    // ✅ Update only allowed fields
    if (updates.price !== undefined) plan.price = updates.price;
    if (updates.features !== undefined) plan.features = updates.features;
    if (updates.isPopular !== undefined)
      plan.isPopular = updates.isPopular;
    if (updates.isPremium !== undefined)
      plan.isPremium = updates.isPremium;

    await plan.save();

    res.status(200).json({
      message: "Membership plan updated successfully",
      plan,
    });
  } catch (error) {
    console.error("❌ Update plan error:", error);
    res.status(500).json({
      message: "Failed to update membership plan",
    });
  }
};
