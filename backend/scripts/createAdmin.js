import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../src/models/admin.js";
import Branch from "../src/models/branch.js";
import Plan from "../src/models/plan.js";
import PlanOverride from "../src/models/planOverride.js";

dotenv.config();

const createAdmin = async () => {
  try {
    const email = process.argv[2];

    if (!email) {
      console.log("❌ Please provide an email");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    /* ❌ Prevent duplicate admin */
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("❌ Admin already exists");
      process.exit(1);
    }

    /* 🔐 Generate password */
    const rawPassword = Math.random().toString(36).slice(-10);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    /* 1️⃣ Create admin */
    const admin = await Admin.create({
      email,
      password: hashedPassword,
      name: "Gym Owner",
      role: "admin"
    });

    /* 2️⃣ Create branch */
    const branchName = email.split("@")[0] + " Gym";
    const branchCode = email.split("@")[0].toUpperCase();

    const branch = await Branch.create({
      name: branchName,
      code: branchCode,
      isActive: true,
      ownerId: admin._id
    });

    /* 3️⃣ Attach branch to admin */
    admin.branchId = branch._id;
    await admin.save();

    /* 4️⃣ COPY ALL GLOBAL PLANS INTO THIS BRANCH */
    const plans = await Plan.find();

    if (plans.length === 0) {
      console.warn("⚠️ No global plans found — branch created without plans");
    } else {
      for (const plan of plans) {
        await PlanOverride.create({
          planId: plan._id,
          branchId: branch._id,
          price: plan.price || 0,  // default branch price
          isPopular: false,
          isPremium: false
        });
      }
    }

    console.log("🎉 Admin & Branch created successfully");
    console.log("📧 Email:", email);
    console.log("🔑 Password:", rawPassword);
    console.log("🏢 Branch:", branch.name);
    console.log("🆔 Branch ID:", branch._id);
    console.log("📦 Membership plans activated for this branch");

    process.exit();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createAdmin();
