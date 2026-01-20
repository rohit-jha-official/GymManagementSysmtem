import AdmissionCharge from "../models/admissionCharge.js";

// GET Admission Charge
export const getAdmissionCharge = async (req, res) => {
  try {
    const charge = await AdmissionCharge.findOne();

    if (!charge) {
      return res.json({ amount: 0 });
    }

    res.json(charge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch admission charge" });
  }
};

// SAVE / UPDATE Admission Charge
export const saveAdmissionCharge = async (req, res) => {
  try {
    const { amount } = req.body;

    let charge = await AdmissionCharge.findOne();

    if (charge) {
      charge.amount = amount;
      await charge.save();
    } else {
      charge = await AdmissionCharge.create({ amount });
    }

    res.json({ message: "Admission charge saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save admission charge" });
  }
};
