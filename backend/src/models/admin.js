import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Gym Owner"
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "admin"
  },

  // 🔐 FORGOT PASSWORD FIELDS
  resetToken: String,
  resetTokenExpiry: Date
});

export default mongoose.model("Admin", adminSchema);
