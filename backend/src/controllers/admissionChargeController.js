import AdmissionCharge from "../models/admissionCharge.js";



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
