import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";          // 🔥 LOAD app.js
import connectDB from "./config/db.js";
import { generateExpiryNotifications } from "./utils/expiryNotificationJob.js";
import notificationRoutes from "./routes/notificationRoutes.js";


connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Run once on server start
generateExpiryNotifications();

// Run every 6 hours
setInterval(generateExpiryNotifications, 6 * 60 * 60 * 1000);
app.use("/api/notifications", notificationRoutes);
