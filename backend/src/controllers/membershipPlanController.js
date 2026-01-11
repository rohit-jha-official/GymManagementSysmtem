import Plan from "../models/plan.js";
import PlanOverride from "../models/planOverride.js";
import Member from "../models/member.js";

/* =====================================
   📋 GET ALL PLANS (BRANCH-WISE)
===================================== */
export const getPlans = async (req, res) => {
  try {
    const branchId = req.user?.branchId;
    if (!branchId) {
      return res.status(401).json({ message: "Branch not found in token" });
    }

    const overrides = await PlanOverride.find({ branchId })
      .populate("planId")
      .lean();

    const today = new Date();

    const plansWithStats = await Promise.all(
      overrides.map(async (o) => {
        const totalMembers = await Member.countDocuments({
          branchId,
          planId: o.planId._id,
        });

        const activeMembers = await Member.countDocuments({
          branchId,
          planId: o.planId._id,
          expiryDate: { $gte: today },
        });

        return {
          _id: o._id,                 // override id
          planId: o.planId._id,       // global plan id
          name: o.planId.name,
          durationDays: o.planId.durationDays,
          price: o.price,
          features: o.planId.features,
          isPopular: o.isPopular,
          isPremium: o.isPremium,
          totalMembers,
          activeMembers,
        };
      })
    );

    res.json(plansWithStats);
  } catch (err) {
    console.error("Get plans error:", err);
    res.status(500).json({ message: "Failed to fetch plans" });
  }
};

/* =====================================
   ✏️ UPDATE BRANCH PRICE
===================================== */
export const updatePlan = async (req, res) => {
  try {
    const branchId = req.user.branchId;
    const { id } = req.params; // override id
    const { price, isPopular, isPremium } = req.body;

    const override = await PlanOverride.findOne({
      _id: id,
      branchId,
    });

    if (!override) {
      return res.status(404).json({ message: "Plan not found" });
    }

    if (price !== undefined) override.price = price;
    if (isPopular !== undefined) override.isPopular = isPopular;
    if (isPremium !== undefined) override.isPremium = isPremium;

    await override.save();

    res.json({ message: "Plan updated" });
  } catch (err) {
    console.error("Update plan error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};
