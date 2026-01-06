import Notification from "../models/notification.js";

/**
 * 📊 GET NOTIFICATION STATS
 * - unreadExpiry
 * - expiringSoonCount
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

    res.json({
      unreadExpiry,
      expiringSoonCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🔔 GET ALL EXPIRY NOTIFICATIONS
 */
export const getExpiryNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      type: "expiry",
    })
      .populate("memberId", "fullName plan phone")
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
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

    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ❌ DELETE NOTIFICATION
 */
export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
