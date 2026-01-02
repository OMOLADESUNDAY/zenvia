// routes/AdminProtected.jsx
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const AdminProtected = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default AdminProtected;
