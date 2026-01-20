import express from "express";
import cors from "cors";
import path from "path";

import Branch from "./models/branch.js";

import authRoutes from "./routes/authRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import membershipPlanRoutes from "./routes/membershipPlanRoutes.js";
const app = express();

/* ================================
   MIDDLEWARE
   ================================ */

app.use(cors({
  origin: [
    "https://wellnessgymexpressbelur.netlify.app"
  ],
  credentials: true
}));
app.use("/api/admin", adminRoutes);
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

/* ================================
   STATIC FILES
   ================================ */
app.use("/uploads", express.static("uploads"));

/* ================================
   API ROUTES
   ================================ */
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/membership-plans", membershipPlanRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);



/* ================================
   HEALTH CHECK
   ================================ */
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* ================================
   GLOBAL ERROR HANDLER
   ================================ */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
  });
});

export default app;
