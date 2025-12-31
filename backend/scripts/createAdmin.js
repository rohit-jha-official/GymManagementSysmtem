import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../src/models/admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    const email = process.argv[2];

    if (!email) {
      console.log("❌ Please provide an email");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("❌ Admin already exists");
      process.exit(1);
    }

    // Generate random password
    const rawPassword = Math.random().toString(36).slice(-10);

    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    await Admin.create({
      email,
      password: hashedPassword,
      name: "Gym Owner"
    });

    console.log("✅ Admin created successfully");
    console.log("📧 Email:", email);
    console.log("🔑 Password:", rawPassword);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
