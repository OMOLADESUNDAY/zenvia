// routes/UserProtected.jsx
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const UserProtected = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserProtected;
