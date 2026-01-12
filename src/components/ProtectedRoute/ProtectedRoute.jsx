import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // 🔐 Allow access only if token exists
  if (token) {
    return <Outlet />;
  }

  // 🔒 Otherwise redirect to login
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;