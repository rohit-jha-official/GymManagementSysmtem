import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import "./CollectPayment.css";

const CollectPayment = ({ totalAmount, memberData, onClose, onSuccess }) => {
  const [paidAmount, setPaidAmount] = useState("");

  const dueAmount =
    totalAmount - Number(paidAmount || 0) > 0
      ? totalAmount - Number(paidAmount || 0)
      : 0;

  const handleConfirm = async () => {
    try {
      await axiosInstance.post("/members", {
        ...memberData,
        paidAmount: Number(paidAmount),
        dueAmount,
      });

      // 🔥 ADD THESE 2 LINES
      alert("Member added successfully ✅");
      onSuccess && onSuccess();

      onClose();
    } catch (err) {
      console.error("Add member error", err);
      alert("Failed to add member");
    }
  };

  return (
    <div className="collect-overlay">
      <div className="collect-box">
        <h2>Collect Payment</h2>

        <div className="line">
          <span>Total Amount</span>
          <span>₹{totalAmount}</span>
        </div>

        <input
          type="number"
          placeholder="Enter paid amount"
          value={paidAmount}
          onChange={(e) => setPaidAmount(e.target.value)}
        />

        <div className="line due">
          <span>Due Amount</span>
          <span>₹{dueAmount}</span>
        </div>

        <div className="btns">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default CollectPayment;
