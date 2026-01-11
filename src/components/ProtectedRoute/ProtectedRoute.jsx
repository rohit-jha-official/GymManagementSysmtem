import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // 🔐 If admin is logged in → allow access
  if (token) {
    return <Outlet />;
  }

  // 🔒 If not logged in → redirect to admin login
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
