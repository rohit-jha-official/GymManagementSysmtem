import express from "express";
import {
  addMember,
  getAllMembers,
  getExpiredMembers,
  getExpiringSoon,
  renewMember,
} from "../controllers/memberController.js";

const router = express.Router();

router.post("/add", addMember);
router.get("/", getAllMembers);
router.get("/expired", getExpiredMembers);
router.get("/expiring", getExpiringSoon);
router.put("/renew/:id", renewMember);

export default router;

