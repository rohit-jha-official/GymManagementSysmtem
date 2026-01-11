import { useState } from "react";
import "./EditPlanModal.css";

const EditPlanModal = ({ plan, onClose, onSave }) => {
  const [price, setPrice] = useState(Number(plan?.price) || 0);
  const [badge, setBadge] = useState(
    plan?.isPremium ? "premium" : plan?.isPopular ? "popular" : "none"
  );

  /* SAVE */
  const handleSave = () => {
    onSave({
      _id: plan._id,
      price: Number(price),
      isPopular: badge === "popular",
      isPremium: badge === "premium",
    });
  };

  return (
    <div className="edit-overlay">
      <div className="edit-modal">
        {/* HEADER */}
        <div className="edit-header">
          <h3>Edit {plan?.name} Plan</h3>
          <button onClick={onClose}>×</button>
        </div>

        {/* BODY */}
        <div className="edit-body">
          <label>Plan Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />

          <label>Badge</label>
          <div className="badge-selector">
            <label>
              <input
                type="radio"
                name="badge"
                checked={badge === "none"}
                onChange={() => setBadge("none")}
              />
              None
            </label>

            <label>
              <input
                type="radio"
                name="badge"
                checked={badge === "popular"}
                onChange={() => setBadge("popular")}
              />
              Popular
            </label>

            <label>
              <input
                type="radio"
                name="badge"
                checked={badge === "premium"}
                onChange={() => setBadge("premium")}
              />
              Premium
            </label>
          </div>
        </div>

        {/* FOOTER */}
        <div className="edit-footer">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="save" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPlanModal;
