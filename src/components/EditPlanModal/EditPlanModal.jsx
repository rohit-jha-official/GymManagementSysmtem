import { useState } from "react";
import "./EditPlanModal.css";

const EditPlanModal = ({ plan, onClose, onSave }) => {
  /* ================= STATE ================= */
  const [price, setPrice] = useState(Number(plan?.price) || 0);

  const [features, setFeatures] = useState(
    Array.isArray(plan?.features) ? [...plan.features] : []
  );

  const [badge, setBadge] = useState(
    plan?.isPremium
      ? "premium"
      : plan?.isPopular
      ? "popular"
      : "none"
  );

  /* ================= FEATURE HANDLERS ================= */
  const updateFeature = (i, value) => {
    const updated = [...features];
    updated[i] = value;
    setFeatures(updated);
  };

  const removeFeature = (i) => {
    setFeatures(features.filter((_, idx) => idx !== i));
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  /* ================= SAVE ================= */
  const handleSave = () => {
    onSave({
      _id: plan._id,
      price: Number(price),
      features: features.filter(Boolean), // remove empty strings
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
          {/* PRICE */}
          <label>Plan Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />

          {/* BADGE (FROM CODE-1) */}
          {/* <label>Badge</label>
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
          </div> */}

          {/* FEATURES (FROM CODE-2) */}
          <label>Features</label>
          <div className="features-edit">
            {features.map((f, i) => (
              <div className="feature-row" key={i}>
                <input
                  value={f}
                  onChange={(e) =>
                    updateFeature(i, e.target.value)
                  }
                />
                <button onClick={() => removeFeature(i)}>
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button className="add-feature" onClick={addFeature}>
            + Add Feature
          </button>
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
