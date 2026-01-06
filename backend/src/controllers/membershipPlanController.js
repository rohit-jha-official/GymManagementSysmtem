// src/controllers/membershipPlanController.js

import MembershipPlan from "../models/membershipPlan.js";
import Member from "../models/member.js";

/**
 * 📋 GET ALL MEMBERSHIP PLANS
 * Includes:
 * - totalMembers
 * - activeMembers
 */
export const getPlans = async (req, res) => {
  try {
    const plans = await MembershipPlan.find().sort({
      durationMonths: 1,
    });

    const today = new Date();

    const plansWithCounts = await Promise.all(
      plans.map(async (plan) => {
        const totalMembers = await Member.countDocuments({
          plan: plan.name,
        });

        const activeMembers = await Member.countDocuments({
          plan: plan.name,
          expiryDate: { $gte: today },
        });

        return {
          ...plan.toObject(),
          totalMembers,
          activeMembers,
        };
      })
    );

    res.json(plansWithCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✏️ UPDATE MEMBERSHIP PLAN
 */
export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, features, isPopular, isPremium } = req.body;

    const plan = await MembershipPlan.findById(id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    if (price !== undefined) plan.price = price;
    if (features !== undefined) plan.features = features;
    if (isPopular !== undefined) plan.isPopular = isPopular;
    if (isPremium !== undefined) plan.isPremium = isPremium;

    await plan.save();

    res.json({
      message: "Membership plan updated successfully",
      plan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
