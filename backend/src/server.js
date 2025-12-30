import dotenv from "dotenv";
dotenv.config();

console.log("ENV OK");

import app from "./app.js";
console.log("APP LOADED");

import connectDB from "./config/db.js";
console.log("DB IMPORTED");

connectDB();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
