import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../features/auth/store/authStore";
import { appointmentService } from "../features/appointments/services/appointmentService";
import type { Appointment } from "../features/appointments/types/appointment.types";
import { patientService } from "../features/patients/services/patientService";
import { serviceService } from "../features/services/services/serviceService";
import { DashboardAppointmentsList } from "../features/dashboard/components/DashboardAppointmentsList";
import { DashboardAlertsPanel } from "../features/dashboard/components/DashboardAlertsPanel";
import { DashboardMetricCard } from "../features/dashboard/components/DashboardMetricCard";
import {
  getTodayDateString,
  getTomorrowDateString,
} from "../features/dashboard/utils/dashboardDateUtils";
import { PageHeader } from "../shared/components/ui/PageHeader";

const roleLabels: Record<string, string> = {
  admin: "Administración",
  psychologist: "Psicóloga",
  assistant: "Asistente",
  client: "Cliente",
};

const ACTIVE_APPOINTMENT_STATUSES = ["scheduled", "confirmed", "rescheduled"];

export function DashboardPage() {
  const currentUser = useAuthStore((state) => state.currentUser);

  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [myTodayAppointments, setMyTodayAppointments] = useState<Appointment[]>(
    [],
  );
  const [newPatientsCount, setNewPatientsCount] = useState(0);
  const [activeServicesCount, setActiveServicesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const today = useMemo(() => getTodayDateString(), []);
  const tomorrow = useMemo(() => getTomorrowDateString(), []);

  useEffect(() => {
    let shouldIgnoreResponse = false;

    async function loadDashboardData() {
      if (!currentUser) {
        return;
      }

      try {
        setIsLoading(true);

        const [
          todayAppointmentsResponse,
          myTodayAppointmentsResponse,
          newPatientsResponse,
          activeServicesResponse,
        ] = await Promise.all([
          appointmentService.getAppointments({
            date_from: today,
            date_to: tomorrow,
            page: 1,
            limit: 50,
          }),
          appointmentService.getAppointments({
            assigned_to_user_id: currentUser.id,
            date_from: today,
            date_to: tomorrow,
            page: 1,
            limit: 50,
          }),
          patientService.getPatients({
            status: "new",
            page: 1,
            limit: 10,
          }),
          serviceService.getServices({
            is_active: true,
            page: 1,
            limit: 10,
          }),
        ]);

        if (shouldIgnoreResponse) {
          return;
        }

        setTodayAppointments(todayAppointmentsResponse.items);
        setMyTodayAppointments(myTodayAppointmentsResponse.items);
        setNewPatientsCount(newPatientsResponse.total);
        setActiveServicesCount(activeServicesResponse.total);
      } catch (error) {
        if (shouldIgnoreResponse) {
          return;
        }

        console.error(error);
        toast.error("No se pudo cargar el resumen del dashboard.");
      } finally {
        if (!shouldIgnoreResponse) {
          setIsLoading(false);
        }
      }
    }

    void loadDashboardData();

    return () => {
      shouldIgnoreResponse = true;
    };
  }, [currentUser, today, tomorrow]);

  const activeTodayAppointments = todayAppointments.filter((appointment) =>
    ACTIVE_APPOINTMENT_STATUSES.includes(appointment.status),
  );

  const pendingConfirmationCount = todayAppointments.filter(
    (appointment) => appointment.status === "scheduled",
  ).length;

  const rescheduledCount = todayAppointments.filter(
    (appointment) => appointment.status === "rescheduled",
  ).length;

  const unassignedCount = todayAppointments.filter(
    (appointment) => !appointment.assigned_to_user_id,
  ).length;

  const dashboardAppointments =
    currentUser?.user_type === "psychologist"
      ? myTodayAppointments
      : activeTodayAppointments;

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Panel privado"
        title={`Bienvenida, ${currentUser?.full_name ?? "Psicomichi"}`}
        description="Resumen operativo para consultar citas, pacientes y servicios activos del día."
      >
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full bg-[#d6e2e0] px-4 py-2 text-sm text-[#4b4b4b]">
            {currentUser?.user_type
              ? roleLabels[currentUser.user_type]
              : "Sin rol"}
          </span>

          <span className="rounded-full bg-[#f5f7f6] px-4 py-2 text-sm text-[#7a8588]">
            {currentUser?.email ?? "Sin email"}
          </span>
        </div>
      </PageHeader>

      {isLoading ? (
        <div className="rounded-[2rem] border border-white/80 bg-white/80 p-6 text-sm text-[#7a8588] shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
          Cargando resumen operativo...
        </div>
      ) : (
        <>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <DashboardMetricCard
              label="Hoy"
              value={todayAppointments.length}
              description="Citas registradas para el día de hoy."
            />

            <DashboardMetricCard
              label="Mis citas"
              value={myTodayAppointments.length}
              description="Citas asignadas a tu usuario para hoy."
            />

            <DashboardMetricCard
              label="Pendientes"
              value={pendingConfirmationCount}
              description="Citas programadas que aún no han sido confirmadas."
            />

            <DashboardMetricCard
              label="Pacientes nuevos"
              value={newPatientsCount}
              description="Pacientes registrados con estado nuevo."
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <DashboardAppointmentsList
              title={
                currentUser?.user_type === "psychologist"
                  ? "Mis citas de hoy"
                  : "Citas activas de hoy"
              }
              description={
                currentUser?.user_type === "psychologist"
                  ? "Citas asignadas a tu usuario para seguimiento."
                  : "Citas vigentes programadas, confirmadas o reagendadas."
              }
              appointments={dashboardAppointments}
              emptyMessage="No hay citas activas para mostrar."
            />

            <DashboardAlertsPanel
              alerts={[
                {
                  label: "Citas sin responsable",
                  value: unassignedCount,
                  description:
                    "Citas del día que todavía no tienen usuario asignado.",
                },
                {
                  label: "Citas reagendadas",
                  value: rescheduledCount,
                  description:
                    "Citas activas del día que fueron movidas de horario.",
                },
                {
                  label: "Servicios activos",
                  value: activeServicesCount,
                  description: "Servicios disponibles para operación interna.",
                },
              ]}
            />
          </div>
        </>
      )}
    </section>
  );
}
