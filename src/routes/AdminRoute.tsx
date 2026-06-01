import { Navigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/authStore";

type AdminRouteProps = {
  children: React.ReactNode;
};

export function AdminRoute({ children }: AdminRouteProps) {
  const currentUser = useAuthStore((state) => state.currentUser);

  const canManageUsers =
    currentUser?.is_superuser || currentUser?.user_type === "admin";

  if (!canManageUsers) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}