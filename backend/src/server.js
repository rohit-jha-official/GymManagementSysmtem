import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";          // 🔥 LOAD app.js
import connectDB from "./config/db.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
app.use("/api/dashboard", dashboardRoutes);