import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import { generateExpiryNotifications } from "./utils/expiryNotificationJob.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import admissionChargeRoutes from "./routes/admissionChargeRoutes.js";


// Connect DB
connectDB();

// ✅ REGISTER ROUTES FIRST
app.use("/api/notifications", notificationRoutes);

app.use("/api", admissionChargeRoutes);


// ✅ PORT FIX FOR RENDER
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Background jobs AFTER server starts
generateExpiryNotifications();
setInterval(generateExpiryNotifications, 6 * 60 * 60 * 1000);
