import Notification from "../models/notification.js";

/* ================================
   🔔 GET EXPIRY NOTIFICATIONS
================================ */
export const getExpiryNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      branchId: req.user.branchId,
      type: "expiry",
    })
      .populate("memberId", "fullName phone")
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Get expiry notifications error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================================
   📊 GET NOTIFICATION STATS
================================ */
export const getNotificationStats = async (req, res) => {
  try {
    const unreadExpiry = await Notification.countDocuments({
      branchId: req.user.branchId,
      type: "expiry",
      isRead: false,
    });

    const expiringSoonCount = await Notification.countDocuments({
      branchId: req.user.branchId,
      type: "expiry",
      subtype: "expiring",
      isRead: false,
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

/* ================================
   ✅ MARK ALL AS READ
================================ */
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        branchId: req.user.branchId,
        type: "expiry",
        isRead: false,
      },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Mark read error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================================
   ❌ DELETE NOTIFICATION
================================ */
export const deleteNotification = async (req, res) => {
  try {
    await Notification.findOneAndDelete({
      _id: req.params.id,
      branchId: req.user.branchId,
    });

    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    console.error("Delete notification error:", error);
    res.status(500).json({ message: error.message });
  }
};
