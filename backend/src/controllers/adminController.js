import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import Branch from "../models/branch.js";


/* ================== GET LOGGED IN ADMIN PROFILE ================== */
export const getAdminProfile = async (req, res) => {
  try {
    console.log("GET PROFILE req.user:", req.user); // debug

    const admin = await Admin.findById(req.user.id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================== UPDATE ADMIN PROFILE ================== */
export const updateAdminProfile = async (req, res) => {
  try {
    console.log("UPDATE PROFILE req.user:", req.user); // debug
    console.log("UPDATE PROFILE req.body:", req.body); // debug

    const { name, phone, gymName } = req.body;

    const admin = await Admin.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.name = name ?? admin.name;
    admin.phone = phone ?? admin.phone;
    admin.gymName = gymName ?? admin.gymName;

    await admin.save();

    res.json({
      message: "Profile updated successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        gymName: admin.gymName,
        branchId: admin.branchId
      }
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================== CHANGE ADMIN PASSWORD ================== */
export const changeAdminPassword = async (req, res) => {
  try {
    console.log("CHANGE PASSWORD req.user:", req.user); // debug

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both passwords are required" });
    }

    const admin = await Admin.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
/* ================== GET ADMISSION CHARGE ================== */
export const getAdmissionCharge = async (req, res) => {
  try {
    const branchId = req.user.branchId;

    const branch = await Branch.findById(branchId).select("admissionCharge");

    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    res.json({ admissionCharge: branch.admissionCharge });
  } catch (error) {
    console.error("GET ADMISSION CHARGE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/* ================== UPDATE ADMISSION CHARGE ================== */
export const updateAdmissionCharge = async (req, res) => {
  try {
    const branchId = req.user.branchId;
    const { admissionCharge } = req.body;

    const branch = await Branch.findByIdAndUpdate(
      branchId,
      { admissionCharge },
      { new: true }
    );

    res.json({
      message: "Admission charge updated successfully",
      admissionCharge: branch.admissionCharge
    });
  } catch (error) {
    console.error("UPDATE ADMISSION CHARGE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
