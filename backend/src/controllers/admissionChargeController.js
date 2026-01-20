import AdmissionCharge from "../models/admissionCharge.js";
console.log("✅ AdmissionCharge Controller Loaded");

// GET
export const getAdmissionCharge = async (req, res) => {
  try {
    const data = await AdmissionCharge.findOne();

    res.json({
      admissionCharge: data ? data.amount : 0,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// SAVE
export const saveAdmissionCharge = async (req, res) => {
  try {
    const { admissionCharge } = req.body;

    let record = await AdmissionCharge.findOne();

    if (record) {
      record.amount = admissionCharge;
      await record.save();
    } else {
      record = await AdmissionCharge.create({
        amount: admissionCharge,
      });
    }

    res.json({
      message: "Admission charge saved",
      admissionCharge: record.amount,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to save" });
  }
};
