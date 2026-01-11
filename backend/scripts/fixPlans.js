import mongoose from "mongoose";
import dotenv from "dotenv";
import Plan from "../src/models/plan.js";
import PlanOverride from "../src/models/planOverride.js";
import Branch from "../src/models/branch.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected");

  const plans = await Plan.find();
  const branches = await Branch.find();

  for (const branch of branches) {
    for (const plan of plans) {
      const exists = await PlanOverride.findOne({
        branchId: branch._id,
        planId: plan._id
      });

      if (!exists) {
        await PlanOverride.create({
          branchId: branch._id,
          planId: plan._id,
          price: 0,              // 🔥 REQUIRED
          isPopular: false,
          isPremium: false
        });
      }
    }
  }

  console.log("Plan overrides created");
  process.exit();
};

run();
