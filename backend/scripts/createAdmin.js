import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../src/models/admin.js";
import Branch from "../src/models/branch.js";

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

    // 🔎 Find MAIN branch
    const mainBranch = await Branch.findOne({ code: "MAIN" });

    if (!mainBranch) {
      console.log("❌ MAIN branch not found. Create branch first.");
      process.exit(1);
    }

    // ❌ Prevent duplicate admin
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("❌ Admin already exists");
      process.exit(1);
    }

    // 🔐 Generate password
    const rawPassword = Math.random().toString(36).slice(-10);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // ✅ Create admin with branch binding
    await Admin.create({
      email,
      password: hashedPassword,
      name: "Gym Owner",
      role: "admin",
      branchId: mainBranch._id   // 🔥 THIS IS THE FIX
    });

    console.log("🎉 Admin created successfully");
    console.log("📧 Email:", email);
    console.log("🔑 Password:", rawPassword);
    console.log("🏢 Branch:", mainBranch.name);

    process.exit();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createAdmin();
