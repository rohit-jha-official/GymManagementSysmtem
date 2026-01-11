import mongoose from "mongoose";
import dotenv from "dotenv";
import Plan from "../src/models/plan.js";
import PlanOverride from "../src/models/planOverride.js";
import Branch from "../src/models/branch.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const branch = await Branch.findOne({ code: "MAIN" });
const plans = await Plan.find();

for (const plan of plans) {
  const exists = await PlanOverride.findOne({
    planId: plan._id,
    branchId: branch._id,
  });

  if (!exists) {
    await PlanOverride.create({
      planId: plan._id,
      branchId: branch._id,
      price: plan.price || 1000,   // default
    });
  }
}

console.log("✅ Branch pricing created");
process.exit();
