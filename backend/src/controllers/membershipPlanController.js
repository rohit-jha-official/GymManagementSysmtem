import MembershipPlan from "../models/membershipPlan.js";
import Member from "../models/member.js";

/**
 * GET ALL PLANS + ACTIVE MEMBERS COUNT
 */
export const getPlans = async (req, res) => {
  try {
    const plans = await MembershipPlan.find().lean();

    const plansWithCount = await Promise.all(
      plans.map(async (plan) => {
        const count = await Member.countDocuments({
          plan: plan.name,
          expiryDate: { $gte: new Date() },
        });

        return { ...plan, activeMembers: count };
      })
    );

    res.json(plansWithCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE PLAN (ADMIN)
 */
export const updatePlan = async (req, res) => {
  try {
    const updated = await MembershipPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
