import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MembershipPlans.css";
import {
  FaBolt,
  FaStar,
  FaCrown,
  FaGem,
  FaCheck,
  FaTrophy,
  FaInfoCircle,
} from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import EditPlanModal from "../EditPlanModal/EditPlanModal";

/* ICON MAP */
const planIcons = {
  "1 Month": <FaBolt />,
  "3 Months": <FaStar />,
  "6 Months": <FaCrown />,
  "9 Months": <FaTrophy />,
  "12 Months": <FaGem />,
};

const MembershipPlans = () => {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 ADMISSION CHARGE STATE
  const [admissionCharge, setAdmissionCharge] = useState(0);
 

  const [isEditingAdmission, setIsEditingAdmission] = useState(false);

  const navigate = useNavigate();

  /* =========================
     FETCH PLANS
     ========================= */
 const fetchPlans = async () => {
  try {
    const res = await axiosInstance.get("/membership-plans");

    const formattedPlans = res.data.plans.map((p) => ({
      _id: p._id,
      name: p.name,
      duration: `${p.durationDays} Days`,
      price: p.price,
      icon: planIcons[p.name] || <FaBolt />,
      features: p.features || [],
      members: p.activeMembers || 0,
      totalMembers: p.totalMembers || 0,
      badge: p.isPremium
        ? "premium"
        : p.isPopular
        ? "popular"
        : null,
    }));

    // ✅ SORT: 1 → 3 → 6 → 9 → 12 months
    formattedPlans.sort((a, b) => {
      const daysA = parseInt(a.duration);
      const daysB = parseInt(b.duration);
      return daysA - daysB;
    });

    setPlans(formattedPlans);
    setAdmissionCharge(res.data.admissionCharge ?? 0);


  } catch (err) {
    console.error("Failed to load plans", err);
  } 
};


  /* =========================
     FETCH ADMISSION CHARGE
     ========================= */
  // const fetchAdmissionCharge = async () => {
  //   try {
  //     const res = await axiosInstance.get("/admission-charge");
  //     setAdmissionCharge(res.data.admissionCharge);
  //   } catch (err) {
  //     console.error("Failed to load admission charge", err);
  //   }
  // };

  /* =========================
     SAVE ADMISSION CHARGE
     ========================= */
// const saveAdmissionCharge = async () => {
//   try {
//     console.log("Saving:", admissionCharge);

//     const res = await axiosInstance.post("/admission-charge", {
//       admissionCharge,
//     });

//     console.log("Saved Response:", res.data);

//     // ✅ Re-fetch updated value from backend
//     await fetchAdmissionCharge();

//     setIsEditingAdmission(false);

//   } catch (err) {
//     console.error("Failed to save admission charge", err);
//     alert("Failed to save admission charge");
//   }
// };


  /* =========================
     SAVE EDITED PLAN (INSTANT UI UPDATE)
     ========================= */
  const handleSavePlan = async (updatedPlan) => {
  try {
    await axiosInstance.put(
      `/membership-plans/${updatedPlan._id}`,
      {
        price: updatedPlan.price,
        features: updatedPlan.features,
        isPopular: updatedPlan.isPopular,
        isPremium: updatedPlan.isPremium,
        admissionCharge,
      }
    );

    // ✅ REFRESH FROM BACKEND (important)
    await fetchPlans();

    setEditingPlan(null);

  } catch (error) {
    console.error("Update failed:", error);

    alert(
      error?.response?.data?.message ||
      "Failed to update plan"
    );
  }
};
useEffect(() => {
  const loadData = async () => {
    await fetchPlans();
    setLoading(false);
  };

  loadData();
}, []);


  if (loading) {
    return (
      <div className="membership-page">
        <p style={{ color: "#9ca3af" }}>
          Loading membership plans...
        </p>
      </div>
    );
  }

  return (
    <div className="membership-page">
      {/* HEADER */}
      <div className="page-header">
        <h1>Membership Plans</h1>
        <p>Manage gym membership plans and pricing</p>
      </div>

      {/* =========================
         ADMISSION CHARGE BOX
         ========================= */}
     {/* /* <div className="admission-charge-box">
        <div className="admission-left">
          <h3>Admission Charge</h3> */}

          {/* {!isEditingAdmission ? (
            <p>₹{admissionCharge}</p>
          ) : (
            <input
              type="number"
              value={admissionCharge}
              onChange={(e) => {
             const val = e.target.value;
            if (val !== "") {
             setAdmissionCharge(Number(val));
            }
              }}

            />
          )}
        </div> */}

        {/* <div className="admission-right">
          {!isEditingAdmission ? (
            <button onClick={() => setIsEditingAdmission(true)}>
              Edit
            </button>
          ) : (
            <button onClick={saveAdmissionCharge}>
              Save
            </button>
          )}
        </div>
      </div> */}

      {/* PLANS GRID */}
      <div className="plans-grid">
        {plans.length === 0 ? (
          <p style={{ color: "#9ca3af" }}>
            No membership plans found
          </p>
        ) : (
          plans.map((plan) => (
            <div key={plan._id} className="plan-card">
              <div className="plan-icon">{plan.icon}</div>

              <h2>{plan.name}</h2>
              <p className="duration">{plan.duration}</p>

              <div className="price">₹{plan.price}</div>
              <span className="admission-note"><FaInfoCircle />Admission Charge ₹{admissionCharge}</span>
              <ul className="features">
                {plan.features.map((f, i) => (
                  <li key={i}>
                    <FaCheck /> {f}
                  </li>
                ))}
              </ul>
              

              {/* ACTIVE MEMBERS */}
              <div
                className="members clickable"
                onClick={() =>
                  navigate(
                    `/members?plan=${encodeURIComponent(
                      plan.name
                    )}&type=active`
                  )
                }
              >
                {plan.members} Active Members
              </div>

              <button
                className="edit-btn"
                onClick={() => setEditingPlan(plan)}
              >
                Edit Plan
              </button>
            </div>
          ))
        )}
      </div>

      {/* STATISTICS */}
      <div className="stats-card">
        <h2>Plan Statistics</h2>
        <p className="sub-text">
          Overview of membership distribution
        </p>

        <div className="stats-grid">
          {plans.map((p) => (
            <div key={p._id}>
              <span
                className="counttt clickable"
                onClick={() =>
                  navigate(
                    `/members?plan=${encodeURIComponent(
                      p.name
                    )}&type=all`
                  )
                }
              >
                {p.totalMembers}
              </span>
              <span>{p.name} Members</span>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingPlan && (
        <EditPlanModal
          plan={editingPlan}
          admissionCharge={admissionCharge}
          setAdmissionCharge={setAdmissionCharge}
          onClose={() => setEditingPlan(null)}
          onSave={handleSavePlan}
        />
      )}

    </div>
  );
};

export default MembershipPlans;
 