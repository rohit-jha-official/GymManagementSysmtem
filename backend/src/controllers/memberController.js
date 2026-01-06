import Member from "../models/member.js";
import planDays from "../utils/planDays.js";
import Activity from "../models/activity.js";

/* ➕ ADD NEW MEMBER */
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
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!planDays[plan]) {
      return res.status(400).json({ message: "Invalid membership plan" });
    }

    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + planDays[plan]);

    const member = await Member.create({
      fullName,
      phone,
      email,
      gender,
      dob,
      address,
      plan,
      rfid,
      startDate,
      expiryDate,
      photo,
      dueAmount: 0,
    });

    await Activity.create({
      type: "member",
      message: `New member registered: ${fullName}`,
    });

    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* 📋 GET ALL MEMBERS */
export const getAllMembers = async (req, res) => {
  try {
    const today = new Date();
    const members = await Member.find().sort({ createdAt: -1 });

    const result = members.map((m) => ({
      _id: m._id,
      name: m.fullName,
      phone: m.phone,
      email: m.email,
      plan: m.plan,
      endDate: m.expiryDate,
      status: m.expiryDate >= today ? "Active" : "Expired",
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ❌ GET EXPIRED MEMBERS */
export const getExpiredMembers = async (req, res) => {
  try {
    const today = new Date();

    const members = await Member.find({
      expiryDate: { $lt: today },
    }).sort({ expiryDate: -1 });

    const result = members.map((m) => ({
      _id: m._id,
      fullName: m.fullName,
      phone: m.phone,
      plan: m.plan,
      expiryDate: m.expiryDate,
      daysExpired: Math.max(
        Math.floor(
          (today.getTime() - new Date(m.expiryDate).getTime()) /
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

/* ⏳ GET EXPIRING SOON */
export const getExpiringSoon = async (req, res) => {
  try {
    const today = new Date();
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    const members = await Member.find({
      expiryDate: { $gte: today, $lte: next7Days },
    }).sort({ expiryDate: 1 });

    const result = members.map((m) => ({
      _id: m._id,
      fullName: m.fullName,
      phone: m.phone,
      plan: m.plan,
      expiryDate: m.expiryDate,
      daysLeft: Math.max(
        Math.ceil(
          (new Date(m.expiryDate).getTime() - today.getTime()) /
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

/* 🔄 RENEW MEMBERSHIP (WITH PARTIAL PAYMENT SUPPORT) */
export const renewMember = async (req, res) => {
  try {
    const { plan, paidAmount, totalAmount } = req.body;

    if (!planDays[plan]) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + planDays[plan]);

    member.plan = plan;
    member.startDate = startDate;
    member.expiryDate = expiryDate;

    // ✅ DUE LOGIC (matches schema)
    if (Number(paidAmount) < Number(totalAmount)) {
      member.dueAmount = Number(totalAmount) - Number(paidAmount);
    } else {
      member.dueAmount = 0;
    }

    await member.save();

    await Activity.create({
      type: "payment",
      message: `Membership renewed: ${member.fullName}`,
    });

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* 💰 GET DUE MEMBERS */
export const getDueMembers = async (req, res) => {
  try {
    const members = await Member.find({
      dueAmount: { $gt: 0 },
    }).sort({ updatedAt: -1 });

    const result = members.map((m) => ({
      _id: m._id,
      fullName: m.fullName,
      phone: m.phone,
      plan: m.plan,
      dueAmount: m.dueAmount,
      expiryDate: m.expiryDate,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ✅ COLLECT DUE PAYMENT */
export const collectDuePayment = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    member.dueAmount = 0;
    member.lastPaymentDate = new Date();
    await member.save();

    await Activity.create({
      type: "payment",
      message: `Due payment collected from ${member.fullName}`,
    });

    res.json({ message: "Due payment collected successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* 🗑️ DELETE MEMBER */
export const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* 👤 GET MEMBER BY ID */
export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
