import Member from "../models/member.js";
import planDays from "../utils/planDays.js";
import Activity from "../models/activity.js";

/**
 * ➕ ADD NEW MEMBER
 */
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
    } = req.body;

    if (!fullName || !phone || !plan) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!planDays[plan]) {
      return res.status(400).json({ message: "Invalid membership plan" });
    }

    const startDate = new Date();
    const expiryDate = new Date(startDate);
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

    await Activity.create({
      type: "member",
      message: `New member registered: ${fullName}`,
    });

    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 📋 GET ALL MEMBERS
 */
export const getAllMembers = async (req, res) => {
  try {
    const { search, status } = req.query;
    const today = new Date();
    let query = {};

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
      _id: m._id,
      name: m.fullName,
      phone: m.phone,
      email: m.email,
      plan: m.plan,
      rfid: m.rfid,
      endDate: m.expiryDate,
      status: m.expiryDate >= today ? "Active" : "Expired",
    }));

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
 * ❌ DELETE MEMBER
 */
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Member.findByIdAndDelete(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    await Activity.create({
      type: "member",
      message: `Member deleted: ${member.fullName}`,
    });

    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

/**
 * ❌ GET EXPIRED MEMBERS
 */
export const getExpiredMembers = async (req, res) => {
  try {
    const today = new Date();

    const members = await Member.find({
      expiryDate: { $lt: today },
    }).sort({ expiryDate: -1 });

    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ⏳ GET EXPIRING SOON (NEXT 7 DAYS)
 */
export const getExpiringSoon = async (req, res) => {
  try {
    const today = new Date();
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    const members = await Member.find({
      expiryDate: { $gte: today, $lte: next7Days },
    }).sort({ expiryDate: 1 });

    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🔄 RENEW MEMBERSHIP
 */
export const renewMembership = async (req, res) => {
  try {
    const { plan, paidAmount = 0, admissionCharge = 0 } = req.body;

    if (!plan || !planDays[plan]) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const startDate =
      member.expiryDate && member.expiryDate > new Date()
        ? new Date(member.expiryDate)
        : new Date();

    const expiryDate = new Date(startDate);
    expiryDate.setDate(expiryDate.getDate() + planDays[plan]);

    const planPrices = {
      Monthly: 800,
      Quarterly: 2199,
      "Half Yearly": 4199,
      Yearly: 7199,
    };

    const totalAmount = planPrices[plan] + admissionCharge;
    const dueAmount = totalAmount - paidAmount;

    member.plan = plan;
    member.startDate = startDate;
    member.expiryDate = expiryDate;
    member.dueAmount = dueAmount;

    await member.save();

    await Activity.create({
      type: "payment",
      message: `Membership renewed: ${member.fullName} | Plan: ${plan}`,
    });

    res.json({
      message: "Membership renewed successfully",
      member,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
