import "./AddMember.css";
import { FaCamera, FaUserPlus, FaIdCard } from "react-icons/fa";

const AddMember = () => {
  return (
    <>
    <div className="add-member-page">
      {/* PAGE HEADER */}
      <div className="page-header">
        <h1>Add New Member</h1>
        <p>Register a new gym member</p>
      </div>

      {/* PROFILE PHOTO */}
      <div className="card">
        <div className="card-title">Profile Photo</div>

        <div className="photo-section">
          <div className="photo-circle">
            <FaCamera />
          </div>

          <div>
            <button className="btn-secondary">Upload Photo</button>
            <p className="hint-text">Coming soon</p>
          </div>
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <div className="card">
        <div className="card-title">
          <FaUserPlus /> Personal Information
        </div>

        <div className="form-grid">
          <div>
            <label>Full Name *</label>
            <input type="text" placeholder="Enter full name" />
          </div>

          <div>
            <label>Phone Number *</label>
            <input type="text" placeholder="9876543210" />
          </div>

          <div>
            <label>Email Address</label>
            <input type="email" placeholder="email@example.com" />
          </div>

          <div>
            <label>Gender</label>
            <select>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Date of Birth</label>
            <input type="date" />
          </div>

          <div>
            <label>Address</label>
            <input type="text" placeholder="Enter full address" />
          </div>
        </div>
      </div>

      {/* MEMBERSHIP DETAILS */}
      <div className="card">
        <div className="card-title">
          <FaIdCard /> Membership Details
        </div>

        <div className="form-grid">
          <div>
            <label>Membership Plan *</label>
            <select>
              <option>Select a plan</option>
              <option>Monthly</option>
              <option>3 Months</option>
              <option>6 Months</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="form-actions">
        <button className="btn-outline">Cancel</button>
        <button className="btn-primary">
          <FaUserPlus /> Add Member
        </button>
      </div>
    </div> 
    </>
  );
};

export default AddMember;
