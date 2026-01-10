import Member from "../models/member.js";
import Notification from "../models/notification.js";

export const generateExpiryNotifications = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize

    const inFiveDays = new Date();
    inFiveDays.setDate(today.getDate() + 5);
    inFiveDays.setHours(23, 59, 59, 999);

    const members = await Member.find({
      expiryDate: { $lte: inFiveDays },
    });

    for (const member of members) {
      const expiry = new Date(member.expiryDate);
      expiry.setHours(0, 0, 0, 0); // normalize

      const diffTime = expiry.getTime() - today.getTime();
      const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let subtype = "expiring";
      let message = `${member.fullName}'s membership expires in ${daysLeft} days`;

      if (daysLeft <= 0) {
        subtype = "expired";
        message = `${member.fullName}'s membership has expired`;
      }

      // 🔍 Avoid duplicates
      const alreadyExists = await Notification.findOne({
        memberId: member._id,
        type: "expiry",
        subtype,
      });

      if (!alreadyExists) {
        await Notification.create({
          type: "expiry",
          subtype,
          memberId: member._id,
          message,
        });
      }
    }

    console.log("✅ Expiry notifications generated correctly");
  } catch (error) {
    console.error("❌ Expiry notification job error:", error);
  }
};
