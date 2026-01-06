import { useState } from "react";
import "./EditPlanModal.css";

const EditPlanModal = ({ plan, onClose, onSave }) => {
  const [price, setPrice] = useState(
    Number(plan.price) || 0
  );
  const [features, setFeatures] = useState([...plan.features]);
  const [badge, setBadge] = useState(plan.badge || "none");

  /* FEATURE HANDLERS */
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

  /* SAVE */
  const handleSave = () => {
    onSave({
      ...plan,
      price: Number(price),              // ✅ NUMBER
      features: features.filter(Boolean),
      badge: badge === "none" ? null : badge,
    });
  };

  return (
    <div className="edit-overlay">
      <div className="edit-modal">
        {/* HEADER */}
        <div className="edit-header">
          <h3>Edit {plan.name} Plan</h3>
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

          {/* BADGE */}
          {/* <label>Plan Highlight</label> */}
          {/* <div className="badge-options">
            {["none", "popular", "very", "premium"].map((b) => (
              <button
                key={b}
                type="button"
                className={`badge-option ${badge === b ? "active" : ""}`}
                onClick={() => setBadge(b)}
              >
                {b === "none" && "None"}
                {b === "popular" && "Popular"}
                {b === "very" && "Very Popular"}
                {b === "premium" && "Premium"}
              </button>
            ))}
          </div> */}

          {/* FEATURES */}
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
