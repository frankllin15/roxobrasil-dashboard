import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContex/AuthProvider";

export const RequireAuth: React.FC = ({ children }) => {
  const { session } = useAuth();

  return session?.token != null ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};
