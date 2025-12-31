import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaDumbbell,
  FaTrophy,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";
import "./User_nav.css";

const UserNav = () => {
  return (
    <aside className="user-sidebar">
      {/* LOGO */}
      <div className="user-logo">
        <FaDumbbell />
        <span>Gym Fit</span>
      </div>

      {/* MENU */}
      <NavLink to="/user/dashboard" className="user-link">
        <FaHome />
        <span>Home</span>
      </NavLink>

      <NavLink to="/user/workout" className="user-link">
        <FaDumbbell />
        <span>Workout</span>
      </NavLink>

      <NavLink to="/user/ranks" className="user-link">
        <FaTrophy />
        <span>Ranks</span>
      </NavLink>

      <NavLink to="/user/plans" className="user-link">
        <FaClipboardList />
        <span>Plans</span>
      </NavLink>

      <NavLink to="/user/profile" className="user-link">
        <FaUser />
        <span>Profile</span>
      </NavLink>
    </aside>
  );
};

export default UserNav;
