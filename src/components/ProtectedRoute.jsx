import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, role } = useContext(AuthContext);

  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
