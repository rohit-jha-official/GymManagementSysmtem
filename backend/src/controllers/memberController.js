import Member from "../models/member.js";
import MembershipPlan from "../models/membershipPlan.js";
import Activity from "../models/activity.js";

/* ================================
   ➕ ADD NEW MEMBER
   ================================ */
export const addMember = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      gender,
      dob,
      address,
      plan,
      rfid,
      photo,
    } = req.body;

    if (!fullName || !phone || !plan) {
      return res
        .status(400)
        .json({ message: "Required fields missing" });
    }

    const planDoc = await MembershipPlan.findById(plan);
    if (!planDoc || !planDoc.durationDays) {
      return res
        .status(400)
        .json({ message: "Invalid membership plan" });
    }

    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(
      expiryDate.getDate() + planDoc.durationDays
    );

    const member = await Member.create({
      fullName,
      phone,
      email,
      gender,
      dob,
      address,
      plan: planDoc._id,
      rfid,
      photo,
      startDate,
      expiryDate,
      paidAmount: planDoc.price,
      dueAmount: 0,
      isRenewed: false,
    });

    await Activity.create({
      type: "member",
      message: `New member registered: ${fullName}`,
    });

    res.status(201).json(member);
  } catch (error) {
    console.error("Add member error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================================
   📋 GET ALL MEMBERS
   ================================ */
export const getAllMembers = async (req, res) => {
  try {
    const today = new Date();

    const members = await Member.find()
      .populate("plan")
      .sort({ createdAt: -1 });

    const result = members.map((m) => ({
      _id: m._id,
      name: m.fullName,
      phone: m.phone,
      email: m.email,
      plan: m.plan?.name || "-",
      endDate: m.expiryDate,
      status:
        m.expiryDate >= today ? "Active" : "Expired",
      rfid: m.rfid,
      photo: m.photo, 
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================================
   ❌ GET EXPIRED MEMBERS
   ================================ */
export const getExpiredMembers = async (req, res) => {
  try {
    const today = new Date();

    const members = await Member.find({
      expiryDate: { $lt: today },
    })
      .populate("plan")
      .sort({ expiryDate: -1 });

    const result = members.map((m) => ({
      _id: m._id,
      fullName: m.fullName,
      phone: m.phone,
      email: m.email, 
      plan: m.plan?.name || "-",
      expiryDate: m.expiryDate,
      photo: m.photo,
      daysExpired: Math.max(
        Math.floor(
          (today - new Date(m.expiryDate)) /
            (1000 * 60 * 60 * 24)
        ),
        1
      ),
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================================
   ⏳ GET EXPIRING SOON
   ================================ */
export const getExpiringSoon = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);   // ✅ normalize start

    const next7Days = new Date(today);
    next7Days.setDate(next7Days.getDate() + 7);
    next7Days.setHours(23, 59, 59, 999); // ✅ normalize end

    const members = await Member.find({
      expiryDate: { $gte: today, $lte: next7Days },
    })
      .populate("plan")
      .sort({ expiryDate: 1 });

    const result = members.map((m) => ({
      _id: m._id,
      fullName: m.fullName,
      phone: m.phone,
      email: m.email,          // ✅ ADD (frontend expects this)
      plan: m.plan?.name || "-",
      expiryDate: m.expiryDate,
      photo: m.photo,          // ✅ ADD (for avatar)
      daysLeft: Math.max(
        Math.ceil(
          (new Date(m.expiryDate) - today) /
            (1000 * 60 * 60 * 24)
        ),
        0
      ),
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================================
   🔄 RENEW MEMBERSHIP (FIXED)
   ================================ */
export const renewMember = async (req, res) => {
  try {
    const planId = req.body.plan || req.body.planId;
    const { paidAmount } = req.body;

    if (!planId) {
      return res
        .status(400)
        .json({ message: "Plan ID is required" });
    }

    const member = await Member.findById(req.params.id);
    if (!member) {
      return res
        .status(404)
        .json({ message: "Member not found" });
    }

    const planDoc = await MembershipPlan.findById(planId);
    if (!planDoc || !planDoc.durationDays) {
      return res
        .status(400)
        .json({ message: "Invalid membership plan" });
    }

    const today = new Date();

    const baseDate =
      member.expiryDate && member.expiryDate > today
        ? member.expiryDate
        : today;

    const newExpiryDate = new Date(baseDate);
    newExpiryDate.setDate(
      newExpiryDate.getDate() + planDoc.durationDays
    );

    const paid = Number(paidAmount) || planDoc.price;

    member.plan = planDoc._id;
    member.expiryDate = newExpiryDate;
    member.isRenewed = true;
    member.paidAmount = paid;
    member.dueAmount = Math.max(
      planDoc.price - paid,
      0
    );

    await member.save();

    await Activity.create({
      type: "payment",
      message: `Membership renewed: ${member.fullName}`,
    });

    res.json({
      message: "Membership renewed successfully",
      member,
    });
  } catch (error) {
    console.error("Renew member error:", error);
    res
      .status(500)
      .json({ message: "Failed to renew membership" });
  }
};

/* ================================
   💰 GET DUE MEMBERS
   ================================ */
export const getDueMembers = async (req, res) => {
  try {
    const members = await Member.find({
      dueAmount: { $gt: 0 },
    })
      .populate("plan")
      .sort({ updatedAt: -1 });

    const result = members.map((m) => ({
      _id: m._id,
      fullName: m.fullName,
      phone: m.phone,
      photo: m.photo,
      plan: m.plan?.name || "-",
      dueAmount: m.dueAmount,
      expiryDate: m.expiryDate,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================================
   ✅ COLLECT DUE PAYMENT (PARTIAL)
================================ */
export const collectDuePayment = async (req, res) => {
  try {
    const { paidAmount } = req.body;

    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const paid = Number(paidAmount);
    if (!paid || paid <= 0) {
      return res.status(400).json({ message: "Invalid paid amount" });
    }

    member.dueAmount = Math.max(member.dueAmount - paid, 0);
    member.lastPaymentDate = new Date();

    await member.save();

    await Activity.create({
      type: "payment",
      message: `Collected ₹${paid} from ${member.fullName}`,
    });

    res.json({
      message: "Payment collected successfully",
      remainingDue: member.dueAmount,
    });
  } catch (error) {
    console.error("Collect due error:", error);
    res.status(500).json({ message: error.message });
  }
};


/* ================================
   🗑️ DELETE MEMBER
   ================================ */
export const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================================
   👤 GET MEMBER BY ID
   ================================ */
export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(
      req.params.id
    ).populate("plan");

    if (!member) {
      return res
        .status(404)
        .json({ message: "Member not found" });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================================
   ✏️ UPDATE MEMBER (ADMIN OVERRIDE)
================================ */
export const updateMember = async (req, res) => {
  try {
    const {
      phone,
      email,
      gender,
      address,
      expiryDate,
      allowExpiryEdit,
    } = req.body;

    const update = {};

    if (phone !== undefined) update.phone = phone;
    if (email !== undefined) update.email = email;
    if (gender !== undefined) update.gender = gender;
    if (address !== undefined) update.address = address;

    // 🔐 ADMIN EXPIRY OVERRIDE
    if (allowExpiryEdit === true && expiryDate) {
      update.expiryDate = new Date(expiryDate);

      await Activity.create({
        type: "admin",
        message: "Admin manually updated expiry date",
      });
    }

    // 🚨 PREVENT EMPTY UPDATE
    if (Object.keys(update).length === 0) {
      return res
        .status(400)
        .json({ message: "Nothing to update" });
    }

    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true }
    ).populate("plan");

    if (!member) {
      return res
        .status(404)
        .json({ message: "Member not found" });
    }

    res.json(member);
  } catch (error) {
    console.error("Update member error:", error);
    res
      .status(500)
      .json({ message: error.message });
  }
};
