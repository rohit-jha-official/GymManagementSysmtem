import Member from "../models/member.js";
import planDays from "../utils/planDays.js";

/**
 * ➕ ADD NEW MEMBER
 * POST /api/members/add
 */
export const addMember = async (req, res) => {
  try {
    const { fullName, phone, email, gender, dob, address, plan, rfid } = req.body;

    if (!fullName || !phone || !plan) {
      return res.status(400).json({ message: "Required fields missing" });
    }
   

    const startDate = new Date();
    const expiryDate = new Date();

     if (!planDays[plan]) {
      return res.status(400).json({ message: "Invalid membership plan" });
    }
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
    });

    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 📋 GET ALL MEMBERS
 * GET /api/members
 * Query params: search, status
 */
export const getAllMembers = async (req, res) => {
  try {
    const { search, status } = req.query;
    const today = new Date();

    let query = {};

    // 🔍 Search by name, phone, email, rfid
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { phone: { $regex: search } },
        { email: { $regex: search, $options: "i" } },
        { rfid: { $regex: search, $options: "i" } },
      ];
    }

    const members = await Member.find(query).sort({ createdAt: -1 });

    let result = members.map((m) => ({
      id: m._id,
      name: m.fullName,
      phone: m.phone,
      email: m.email,
      plan: m.plan,
      rfid: m.rfid,
      endDate: m.expiryDate,
      status: m.expiryDate >= today ? "Active" : "Expired",
    }));

    // 🧠 Filter by status AFTER computing
    if (status) {
      result = result.filter(
        (m) => m.status.toLowerCase() === status.toLowerCase()
      );
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ❌ GET EXPIRED MEMBERS
 * GET /api/members/expired
 */
export const getExpiredMembers = async (req, res) => {
  try {
    const today = new Date();

    const members = await Member.find({
      expiryDate: { $lt: today },
    }).sort({ expiryDate: -1 });

    const result = members.map((m) => ({
      id: m._id,
      name: m.fullName,
      phone: m.phone,
      email: m.email,
      plan: m.plan,
      expiryDate: m.expiryDate,
      daysExpired: Math.floor(
        (today - new Date(m.expiryDate)) / (1000 * 60 * 60 * 24)
      ),
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ⏳ GET EXPIRING SOON (NEXT 7 DAYS)
 * GET /api/members/expiring
 */
export const getExpiringSoon = async (req, res) => {
  try {
    const today = new Date();
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    const members = await Member.find({
      expiryDate: { $gte: today, $lte: next7Days },
    }).sort({ expiryDate: 1 });

    const result = members.map((m) => ({
      id: m._id,
      name: m.fullName,
      phone: m.phone,
      plan: m.plan,
      expiryDate: m.expiryDate,
      daysLeft: Math.ceil(
        (new Date(m.expiryDate) - today) / (1000 * 60 * 60 * 24)
      ),
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🔄 RENEW MEMBERSHIP
 * PUT /api/members/renew/:id
 */
export const renewMember = async (req, res) => {
  try {
    const { plan } = req.body;

    if (!plan) {
      return res.status(400).json({ message: "Plan is required" });
    }

    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + planDays[plan]);

    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { plan, startDate, expiryDate },
      { new: true }
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
