import mongoose from "mongoose";
import dotenv from "dotenv";
import Branch from "../src/models/branch.js";
import Admin from "../src/models/admin.js";
import Plan from "../src/models/plan.js";
import PlanOverride from "../src/models/planOverride.js";

dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // 1️⃣ Find the admin who will own this branch
    const admin = await Admin.findOne({ email: "Branch1@gmail.com" });
    if (!admin) {
      console.log("❌ Admin not found. Create admin first.");
      process.exit(1);
    }

    // 2️⃣ Check if branch already exists for this admin
    const existing = await Branch.findOne({
      code: "MAIN",
      ownerId: admin._id
    });

    if (existing) {
      console.log("ℹ️ Branch already exists:", existing._id);
      process.exit(0);
    }

    // 3️⃣ Create branch with ownerId
    const branch = await Branch.create({
      name: "Main Branch",
      code: "MAIN",
      ownerId: admin._id
    });

    console.log("✅ Branch created:", branch._id);

    // 4️⃣ Attach branch to admin
    admin.branch_id = branch._id;
    await admin.save();

    console.log("✅ Branch linked to admin");

    // ======================================
    // 🔥 AUTO ATTACH ALL PLANS TO NEW BRANCH
    // ======================================

    const plans = await Plan.find();

    if (plans.length === 0) {
      console.log("⚠️ No global plans found");
    } else {
      const overrides = plans.map((plan) => ({
        planId: plan._id,
        branchId: branch._id,
        price: 0, // default price (can edit from UI)
        isPopular: false,
        isPremium: false
      }));

      await PlanOverride.insertMany(overrides);

      console.log(`✅ ${overrides.length} plans attached to branch`);
    }

    process.exit(0);

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

run();
