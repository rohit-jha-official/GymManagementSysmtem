// src/controllers/membershipPlanController.js

import MembershipPlan from "../models/membershipPlan.js";
import Member from "../models/member.js";

/* ================================
   📋 GET ALL MEMBERSHIP PLANS
   ================================ */
export const getPlans = async (req, res) => {
  try {
    const plans = await MembershipPlan.find().sort({
      durationDays: 1,
    });

    const today = new Date();

    const plansWithCounts = await Promise.all(
      plans.map(async (plan) => {
        const totalMembers = await Member.countDocuments({
          plan: plan._id,
        });

        const activeMembers = await Member.countDocuments({
          plan: plan._id,
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
    console.error("Get plans error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch membership plans" });
  }
};

/* ================================
   ➕ CREATE MEMBERSHIP PLAN
   ================================ */
export const createPlan = async (req, res) => {
  try {
    const {
      name,
      price,
      durationDays,
      features,
      isPopular,
      isPremium,
    } = req.body;

    if (!name || !price || !durationDays) {
      return res.status(400).json({
        message: "name, price and durationDays are required",
      });
    }

    const exists = await MembershipPlan.findOne({ name });
    if (exists) {
      return res.status(400).json({
        message: "Membership plan already exists",
      });
    }

    const plan = await MembershipPlan.create({
      name,
      price,
      durationDays,
      features: features || [],
      isPopular: !!isPopular,
      isPremium: !!isPremium,
    });

    res.status(201).json(plan);
  } catch (error) {
    console.error("Create plan error:", error);
    res
      .status(500)
      .json({ message: "Failed to create plan" });
  }
};

/* ================================
   ✏️ UPDATE MEMBERSHIP PLAN
   ================================ */
export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, features, isPopular, isPremium } = req.body;

    const plan = await MembershipPlan.findById(id);

    if (!plan) {
      return res.status(404).json({
        message: "Plan not found",
      });
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
    console.error("Update plan error:", error);
    res
      .status(500)
      .json({ message: "Failed to update plan" });
  }
};
