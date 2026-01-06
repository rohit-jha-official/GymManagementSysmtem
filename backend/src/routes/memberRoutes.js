import express from "express";
import {
  addMember,
  getAllMembers,
  getExpiredMembers,
  getExpiringSoon,
  getDueMembers,
  renewMember,
  collectDuePayment,
  getMemberById,
  deleteMember,
} from "../controllers/memberController.js";

const router = express.Router();

router.post("/", addMember);

router.get("/", getAllMembers);

router.get("/due", getDueMembers);

router.get("/expired", getExpiredMembers);

router.get("/expiring", getExpiringSoon);

router.put("/renew/:id", renewMember);

router.put("/collect-due/:id", collectDuePayment);

router.get("/:id", getMemberById);

router.delete("/:id", deleteMember);

export default router;
