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
import admissionChargeRoutes from "./routes/admissionChargeRoutes.js";

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

// ✅ CRITICAL: Body parsers MUST come BEFORE routes
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
app.use("/api/admin", adminRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/membership-plans", membershipPlanRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", admissionChargeRoutes);



/* ================================
   HEALTH CHECK
   ================================ */
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ API health endpoint (useful to confirm Render is running THIS Express app)
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "gym-backend", ts: Date.now() });
});

/* ================================
   404 HANDLER (for unmatched routes)
   ================================ */
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
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
