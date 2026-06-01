import { Navigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/authStore";
import { canAccessPatients } from "../features/patients/utils/patientPermissions";

type PatientsRouteProps = {
  children: React.ReactNode;
};

export function PatientsRoute({ children }: PatientsRouteProps) {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!canAccessPatients(currentUser)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}