import { Navigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

import Skeleton from "@/components/ui/Skeleton";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "client" | "technician")[];
}

export default function PrivateRoute({
  children,
  allowedRoles,
}: PrivateRouteProps) {
  const { isAuthenticated, user, loading } = useAuth();

  // Aguarda a recuperação da sessão antes de validar o acesso.
  if (loading) {
    return <Skeleton />;
  }

  // Usuário não autenticado.
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Usuário autenticado, porém sem permissão para acessar a rota.
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
