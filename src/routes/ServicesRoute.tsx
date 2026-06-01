import { Navigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/authStore";
import { canAccessServices } from "../features/services/utils/servicePermissions";

type ServicesRouteProps = {
  children: React.ReactNode;
};

export function ServicesRoute({ children }: ServicesRouteProps) {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!canAccessServices(currentUser)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}