import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface PrivateRoutesProps {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "client" | "technician")[];
}

export default function PrivateRoute({
  children,
  allowedRoles,
}: PrivateRoutesProps) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
