import { Navigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/authStore";
import { canAccessAppointments } from "../features/appointments/utils/appointmentPermissions";

type AppointmentsRouteProps = {
  children: React.ReactNode;
};

export function AppointmentsRoute({ children }: AppointmentsRouteProps) {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!canAccessAppointments(currentUser)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}