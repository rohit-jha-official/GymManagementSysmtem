import { Outlet } from "react-router-dom";
import UserNav from "../User_nav/User_nav";
import "./UserLayout.css";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <UserNav />
      <div className="user-page">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
