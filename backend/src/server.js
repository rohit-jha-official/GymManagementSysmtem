import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 👇 THIS LINE IS CRITICAL
connectDB();

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
