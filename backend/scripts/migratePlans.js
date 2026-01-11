import mongoose from "mongoose";
import dotenv from "dotenv";
import MembershipPlan from "../src/models/membershipPlan.js";
import Plan from "../src/models/plan.js";
import PlanOverride from "../src/models/planOverride.js";
import Branch from "../src/models/branch.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // 1️⃣ Get default branch (MAIN)
  const defaultBranch = await Branch.findOne({ code: "MAIN" });

  if (!defaultBranch) {
    console.log("❌ No MAIN branch found");
    process.exit(1);
  }

  const oldPlans = await MembershipPlan.find();

  for (const old of oldPlans) {
    // 2️⃣ If old plan has no branch, attach MAIN
    const branchId = old.branchId || defaultBranch._id;

    // 3️⃣ Create or get global plan
    let plan = await Plan.findOne({ name: old.name });

    if (!plan) {
      plan = await Plan.create({
        name: old.name,
        durationDays: old.durationDays,
        features: old.features,
      });
    }

    // 4️⃣ Prevent duplicate override
    const exists = await PlanOverride.findOne({
      planId: plan._id,
      branchId: branchId,
    });

    if (!exists) {
      await PlanOverride.create({
        planId: plan._id,
        branchId: branchId,
        price: old.price,
        isPopular: old.isPopular,
        isPremium: old.isPremium,
      });
    }
  }

  console.log("✅ Plans migrated safely");
  process.exit();
};

run();
