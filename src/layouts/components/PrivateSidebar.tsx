import type { CurrentUser } from "../../features/auth/types/auth.types";

import { canAccessPatients } from "../../features/patients/utils/patientPermissions";
import { canAccessServices } from "../../features/services/utils/servicePermissions";
import { canManageUsers } from "../../features/users/utils/userPermissions";
import { canAccessAppointments } from "../../features/appointments/utils/appointmentPermissions";

import { NavItem } from "./NavItem";
import { UserSessionCard } from "./UserSessionCard";

type PrivateSidebarProps = {
  currentUser: CurrentUser | null;
  isLoading: boolean;
  onLogout: () => void;
};

type SidebarNavItem = {
  label: string;
  to?: string;
  disabled?: boolean;
  adminOnly?: boolean;
  patientsOnly?: boolean;
  servicesOnly?: boolean;
  appointmentsOnly?: boolean;
};

const navItems: SidebarNavItem[] = [
  {
    label: "Inicio",
    to: "/dashboard",
  },
  {
    label: "Usuarios",
    to: "/users",
    adminOnly: true,
  },
  {
    label: "Pacientes",
    to: "/patients",
    patientsOnly: true,
  },
  {
    label: "Agenda",
    to: "/appointments",
    appointmentsOnly: true,
  },
  {
    label: "Servicios",
    to: "/services",
    servicesOnly: true,
  },
  {
    label: "Productos",
    disabled: true,
  },
  {
    label: "Eventos",
    disabled: true,
  },
];

export function PrivateSidebar({
  currentUser,
  isLoading,
  onLogout,
}: PrivateSidebarProps) {
  const canSeeUsers = canManageUsers(currentUser);
  const canSeePatients = canAccessPatients(currentUser);
  const canSeeServices = canAccessServices(currentUser);
  const canSeeAppointments = canAccessAppointments(currentUser);
  const visibleNavItems = navItems.filter((item) => {
    if (item.adminOnly && !canSeeUsers) {
      return false;
    }

    if (item.patientsOnly && !canSeePatients) {
      return false;
    }

    if (item.servicesOnly && !canSeeServices) {
      return false;
    }
    if (item.appointmentsOnly && !canSeeAppointments) {
      return false;
    }
    return true;
  });

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-[#d6e2e0] bg-white/80 px-5 py-7 backdrop-blur lg:flex lg:flex-col">
      <div>
        <p className="text-lg tracking-wide text-[#4b4b4b]">
          PSICÓLOGA KAREN CHICO
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#9fb8b4]">
          Psicomichi
        </p>
      </div>

      <nav className="mt-12 space-y-2">
        {visibleNavItems.map((item) => (
          <NavItem
            key={item.label}
            to={item.to}
            label={item.label}
            disabled={item.disabled}
          />
        ))}
      </nav>

      <div className="mt-auto">
        <UserSessionCard
          currentUser={currentUser}
          isLoading={isLoading}
          onLogout={onLogout}
        />
      </div>
    </aside>
  );
}
