import Notification from "../models/notification.js";
import Member from "../models/member.js";

/**
 * 🔔 GET ALL EXPIRY NOTIFICATIONS
 */
export const getExpiryNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ type: "expiry" })
      .populate("memberId", "fullName plan phone expiryDate")
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Get expiry notifications error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * 📊 GET NOTIFICATION STATS (for bell count)
 */
export const getNotificationStats = async (req, res) => {
  try {
    const unreadExpiry = await Notification.countDocuments({
      type: "expiry",
      isRead: false,
    });

    const expiringSoonCount = await Notification.countDocuments({
      type: "expiry",
      subtype: "expiring",
    });

    res.status(200).json({
      unreadExpiry,
      expiringSoonCount,
    });
  } catch (error) {
    console.error("Notification stats error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ MARK ALL AS READ
 */
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { type: "expiry", isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Mark read error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * ❌ DELETE NOTIFICATION
 */
export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    console.error("Delete notification error:", error);
    res.status(500).json({ message: error.message });
  }
};
