import express from "express";
import {
  getRecentActivity,
  deleteActivity,
} from "../controllers/activityController.js";

const router = express.Router();

router.get("/recent", getRecentActivity);
router.delete("/:id", deleteActivity);

export default router;
