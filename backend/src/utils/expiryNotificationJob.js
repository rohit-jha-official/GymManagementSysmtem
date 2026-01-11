import Member from "../models/member.js";
import Notification from "../models/notification.js";
import mongoose from "mongoose";

export const generateExpiryNotifications = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const inFiveDays = new Date();
    inFiveDays.setDate(today.getDate() + 5);
    inFiveDays.setHours(23, 59, 59, 999);

    const members = await Member.find({
      expiryDate: { $lte: inFiveDays },
    }).select("_id fullName expiryDate branchId");

    for (const member of members) {
      // 🛑 SAFETY: branchId is REQUIRED
      if (
        !member.branchId ||
        !mongoose.Types.ObjectId.isValid(member.branchId)
      ) {
        console.warn(
          `⚠️ Skipping notification for member ${member._id} (missing branchId)`
        );
        continue;
      }

      const expiry = new Date(member.expiryDate);
      expiry.setHours(0, 0, 0, 0);

      const diffTime = expiry.getTime() - today.getTime();
      const daysLeft = Math.ceil(
        diffTime / (1000 * 60 * 60 * 24)
      );

      let subtype = "expiring";
      let message = `${member.fullName}'s membership expires in ${daysLeft} days`;

      if (daysLeft <= 0) {
        subtype = "expired";
        message = `${member.fullName}'s membership has expired`;
      }

      // 🔍 Avoid duplicates (branch-safe)
      const alreadyExists = await Notification.findOne({
        memberId: member._id,
        branchId: member.branchId,
        type: "expiry",
        subtype,
      });

      if (alreadyExists) continue;

      // ✅ CREATE NOTIFICATION (FIXED)
      await Notification.create({
        type: "expiry",
        subtype,
        memberId: member._id,
        branchId: member.branchId, // ✅ REQUIRED FIELD
        message,
        isRead: false,
      });
    }

    console.log("✅ Expiry notifications generated correctly");
  } catch (error) {
    // ❌ Never crash the app
    console.error("❌ Expiry notification job error:", error.message);
  }
};
