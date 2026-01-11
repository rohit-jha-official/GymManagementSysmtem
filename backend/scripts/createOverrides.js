import mongoose from "mongoose";
import dotenv from "dotenv";
import Plan from "../src/models/plan.js";
import Branch from "../src/models/branch.js";
import PlanOverride from "../src/models/planOverride.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected");

const plans = await Plan.find();
const branches = await Branch.find();

for (const branch of branches) {
  for (const plan of plans) {
    const exists = await PlanOverride.findOne({
      planId: plan._id,
      branchId: branch._id,
    });

    if (!exists) {
      await PlanOverride.create({
        planId: plan._id,
        branchId: branch._id,
        price: plan.defaultPrice,
        isPopular: false,
        isPremium: false,
      });

      console.log(`Created override: ${branch.name} → ${plan.name}`);
    }
  }
}

console.log("All overrides created");
process.exit();
