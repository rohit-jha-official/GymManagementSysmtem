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
  updateMember,
} from "../controllers/memberController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.use(protect);
router.post("/", addMember);

router.get("/",getAllMembers);

router.get("/due",getDueMembers);

router.get("/expired", getExpiredMembers);

router.get("/expiring", getExpiringSoon);

router.put("/renew/:id", renewMember);

router.put("/collect-due/:id", collectDuePayment);

/* ✅ PUT BEFORE GET :id */
router.put("/:id", updateMember);

router.get("/:id", getMemberById);

router.delete("/:id",deleteMember);


export default router;
