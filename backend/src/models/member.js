import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    gender: String,

    dob: String, // ✅ DD/MM/YYYY

    address: String,

    plan: {
      type: String,
      enum: ["Monthly", "Quarterly", "Half Yearly", "Yearly"],
      required: true,
    },
    dueAmount: {
      type: Number,
      default: 0,
    },




    rfid: {  type: String, unique: true, sparse: true, trim: true },

    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },

    photo: {
      type: String,   // Base64 string
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);

export default Member;
