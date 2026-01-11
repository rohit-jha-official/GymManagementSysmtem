import Member from "../models/member.js";
import Plan from "../models/plan.js";
import PlanOverride from "../models/planOverride.js";
import Activity from "../models/activity.js";

/* ======================================
   ➕ ADD NEW MEMBER
====================================== */
export const addMember = async (req, res) => {
  try {
    const { fullName, phone, email, gender, dob, address, planId, rfid, photo } =
      req.body;

    if (!fullName || !phone || !planId) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const plan = await Plan.findById(planId);
    if (!plan) return res.status(400).json({ message: "Invalid plan" });

    const override = await PlanOverride.findOne({
      planId: plan._id,
      branchId: req.branchId,
    });

    if (!override) {
      return res.status(400).json({ message: "Plan not available in this branch" });
    }

    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + plan.durationDays);

    const member = await Member.create({
      fullName,
      phone,
      email,
      gender,
      dob,
      address,
      planId: plan._id,
      branchId: req.user.branchId,
      rfid,
      photo,
      startDate,
      expiryDate,
      paidAmount: override.price,
      dueAmount: 0,
      isRenewed: false,
    });

    await Activity.create({
      type: "member",
      message: `New member registered: ${fullName}`,
      branchId: req.branchId,
    });

    res.status(201).json(member);
  } catch (err) {
    console.error("Add member error:", err);
    res.status(500).json({ message: "Failed to add member" });
  }
};

/* ======================================
   📋 GET ALL MEMBERS
====================================== */
export const getAllMembers = async (req, res) => {
  try {
    const today = new Date();

    const members = await Member.find({ branchId: req.user.branchId })
      .populate("planId")
      .sort({ createdAt: -1 });

    res.json(
      members.map((m) => ({
        _id: m._id,
        fullName: m.fullName,
        phone: m.phone,
        email: m.email,
        plan: m.planId?.name || "-",
        expiryDate: m.expiryDate,
        status: m.expiryDate >= today ? "Active" : "Expired",
        rfid: m.rfid,
        photo: m.photo,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================
   ❌ EXPIRED MEMBERS
====================================== */
export const getExpiredMembers = async (req, res) => {
  try {
    const today = new Date();

    const members = await Member.find({
      branchId: req.user.branchId,
      expiryDate: { $lt: today },
    }).populate("planId");

    res.json(
      members.map((m) => ({
        _id: m._id,
        fullName: m.fullName,
        phone: m.phone,
        plan: m.planId?.name || "-",
        expiryDate: m.expiryDate,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================
   ⏳ EXPIRING SOON
====================================== */
export const getExpiringSoon = async (req, res) => {
  try {
    const today = new Date();
    const next7 = new Date();
    next7.setDate(today.getDate() + 7);

    const members = await Member.find({
      branchId: req.user.branchId,
      expiryDate: { $gte: today, $lte: next7 },
    }).populate("planId");

    res.json(
      members.map((m) => ({
        _id: m._id,
        fullName: m.fullName,
        phone: m.phone,
        plan: m.planId?.name || "-",
        expiryDate: m.expiryDate,
        daysLeft: Math.ceil((m.expiryDate - today) / 86400000),
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================
   🔄 RENEW MEMBERSHIP
====================================== */
export const renewMember = async (req, res) => {
  try {
    const { planId, paidAmount } = req.body;

    const member = await Member.findOne({
      _id: req.params.id,
      branchId: req.user.branchId,
    });

    if (!member) return res.status(404).json({ message: "Member not found" });

    const plan = await Plan.findById(planId);
    const override = await PlanOverride.findOne({
      planId,
      branchId: req.user.branchId,
    });

    if (!plan || !override)
      return res.status(400).json({ message: "Invalid plan" });

    const baseDate =
      member.expiryDate > new Date() ? member.expiryDate : new Date();

    const newExpiry = new Date(baseDate);
    newExpiry.setDate(newExpiry.getDate() + plan.durationDays);

    const paid = Number(paidAmount) || override.price;

    member.planId = plan._id;
    member.expiryDate = newExpiry;
    member.isRenewed = true;
    member.paidAmount = paid;
    member.dueAmount = Math.max(override.price - paid, 0);

    await member.save();

    await Activity.create({
      type: "payment",
      message: `Membership renewed: ${member.fullName}`,
      branchId: req.user.branchId,
    });

    res.json({ message: "Renewed successfully", member });
  } catch (err) {
    res.status(500).json({ message: "Renewal failed" });
  }
};

/* ======================================
   💰 DUE MEMBERS
====================================== */
export const getDueMembers = async (req, res) => {
  try {
    const members = await Member.find({
      branchId: req.user.branchId,
      dueAmount: { $gt: 0 },
    }).populate("planId");

    res.json(
      members.map((m) => ({
        _id: m._id,
        fullName: m.fullName,
        phone: m.phone,
        plan: m.planId?.name || "-",
        dueAmount: m.dueAmount,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================
   💰 COLLECT DUE PAYMENT
====================================== */
export const collectDuePayment = async (req, res) => {
  try {
    const { paidAmount } = req.body;

    const member = await Member.findOne({
      _id: req.params.id,
      branchId: req.user.branchId,
    });

    if (!member) return res.status(404).json({ message: "Member not found" });

    const paid = Number(paidAmount);
    if (!paid || paid <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    member.dueAmount = Math.max(member.dueAmount - paid, 0);
    member.lastPaymentDate = new Date();
    await member.save();

    await Activity.create({
      type: "payment",
      message: `Due payment collected from ${member.fullName}`,
      branchId: req.branchId,
    });

    res.json({ message: "Payment collected successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================
   🗑 DELETE MEMBER
====================================== */
export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findOneAndDelete({
      _id: req.params.id,
      branchId: req.user.branchId,
    });

    if (!member) return res.status(404).json({ message: "Member not found" });

    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================
   👤 GET MEMBER BY ID
====================================== */
export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findOne({
      _id: req.params.id,
      branchId: req.user.branchId,
    }).populate("planId");

    if (!member) return res.status(404).json({ message: "Member not found" });

    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================
   ✏ UPDATE MEMBER
====================================== */
export const updateMember = async (req, res) => {
  try {
    const { phone, email, gender, address, expiryDate, allowExpiryEdit } =
      req.body;

    const update = {};
    if (phone !== undefined) update.phone = phone;
    if (email !== undefined) update.email = email;
    if (gender !== undefined) update.gender = gender;
    if (address !== undefined) update.address = address;
    if (allowExpiryEdit && expiryDate) update.expiryDate = new Date(expiryDate);

    const member = await Member.findOneAndUpdate(
      { _id: req.params.id, branchId: req.user.branchId },
      { $set: update },
      { new: true }
    );

    if (!member) return res.status(404).json({ message: "Member not found" });

    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
