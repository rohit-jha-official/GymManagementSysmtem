import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// ✅ SERVE UPLOADED IMAGES (if any)
app.use("/uploads", express.static("uploads"));

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/notifications", notificationRoutes);

// ✅ HEALTH CHECK
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

export default app;
