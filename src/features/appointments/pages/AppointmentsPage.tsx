import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuthStore } from "../../auth/store/authStore";
import { AppointmentActionConfirmModal } from "../components/AppointmentActionConfirmModal";
import { RescheduleAppointmentModal } from "../components/RescheduleAppointmentModal";
import { AppointmentsFilters } from "../components/AppointmentsFilters";
import { AppointmentsTable } from "../components/AppointmentsTable";
import { CreateAppointmentModal } from "../components/CreateAppointmentModal";
import { appointmentService } from "../services/appointmentService";
import { getApiErrorMessage } from "../../../shared/utils/apiError";
import type {
  AppointmentActionType,
  PendingAppointmentAction,
} from "../types/appointmentAction.types";
import {
  DEFAULT_APPOINTMENT_FILTERS,
  type AppointmentFiltersValues,
} from "../types/appointmentFilters.types";
import type {
  Appointment,
  AppointmentsListQuery,
} from "../types/appointment.types";
import { canManageAppointments } from "../utils/appointmentPermissions";

const INITIAL_APPOINTMENTS_QUERY: AppointmentsListQuery = {
  page: 1,
  limit: 10,
};

function buildAppointmentsQuery(
  filters: AppointmentFiltersValues,
): AppointmentsListQuery {
  return {
    search: filters.search || undefined,
    status: filters.status || undefined,
    modality: filters.modality || undefined,
    date_from: filters.date_from || undefined,
    date_to: filters.date_to || undefined,
    page: 1,
    limit: 10,
  };
}

export function AppointmentsPage() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const canManage = canManageAppointments(currentUser);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<AppointmentFiltersValues>(
    DEFAULT_APPOINTMENT_FILTERS,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [pendingAction, setPendingAction] =
    useState<PendingAppointmentAction>(null);
  const [isActionSubmitting, setIsActionSubmitting] = useState(false);
  const [actionReason, setActionReason] = useState("");

  const [appointmentToReschedule, setAppointmentToReschedule] =
    useState<Appointment | null>(null);

  async function fetchAppointments(query: AppointmentsListQuery) {
    try {
      setIsLoading(true);

      const response = await appointmentService.getAppointments(query);

      setAppointments(response.items);
      setTotal(response.total);
    } catch (error) {
      console.error(error);
      toast.error(getApiErrorMessage(error) || "No se pudieron cargar las citas.");
    } finally {
      setIsLoading(false);
    }
  }

  function openAppointmentActionConfirm(
    type: AppointmentActionType,
    appointment: Appointment,
  ) {
    setActionReason("");
    setPendingAction({
      type,
      appointment,
    });
  }

  function closeAppointmentActionConfirm() {
    if (isActionSubmitting) {
      return;
    }

    setActionReason("");
    setPendingAction(null);
  }

  function handleSearch() {
    void fetchAppointments(buildAppointmentsQuery(filters));
  }

  function handleClearFilters() {
    setFilters(DEFAULT_APPOINTMENT_FILTERS);
    void fetchAppointments(INITIAL_APPOINTMENTS_QUERY);
  }

  function handleAppointmentCreated() {
    void fetchAppointments(buildAppointmentsQuery(filters));
  }

  function handleConfirmAppointment(appointment: Appointment) {
    openAppointmentActionConfirm("confirm", appointment);
  }

  function handleCompleteAppointment(appointment: Appointment) {
    openAppointmentActionConfirm("complete", appointment);
  }

  function handleCancelAppointment(appointment: Appointment) {
    openAppointmentActionConfirm("cancel", appointment);
  }

  function handleNoShowAppointment(appointment: Appointment) {
    openAppointmentActionConfirm("no_show", appointment);
  }

  function handleRescheduleAppointment(appointment: Appointment) {
    setAppointmentToReschedule(appointment);
  }

  function handleCloseRescheduleModal() {
    setAppointmentToReschedule(null);
  }

  function handleAppointmentRescheduled() {
    void fetchAppointments(buildAppointmentsQuery(filters));
  }

  async function handleConfirmAppointmentAction() {
    if (!pendingAction) {
      return;
    }

    try {
      setIsActionSubmitting(true);

      if (pendingAction.type === "confirm") {
        await appointmentService.confirmAppointment(
          pendingAction.appointment.id,
        );
        toast.success("Cita confirmada correctamente.");
      }

      if (pendingAction.type === "complete") {
        await appointmentService.completeAppointment(
          pendingAction.appointment.id,
        );
        toast.success("Cita completada correctamente.");
      }

      if (pendingAction.type === "cancel") {
        await appointmentService.cancelAppointment(
          pendingAction.appointment.id,
          {
            cancellation_reason: actionReason.trim(),
          },
        );
        toast.success("Cita cancelada correctamente.");
      }

      if (pendingAction.type === "no_show") {
        await appointmentService.markAppointmentNoShow(
          pendingAction.appointment.id,
          {
            notes: actionReason.trim() || null,
          },
        );
        toast.success("Cita marcada como no asistida.");
      }

      setPendingAction(null);
      setActionReason("");

      await fetchAppointments(buildAppointmentsQuery(filters));
    } catch (error) {
      console.error(error);
      toast.error(getApiErrorMessage(error) || "No se pudo completar la acción.");
    } finally {
      setIsActionSubmitting(false);
    }
  }

  useEffect(() => {
    let shouldIgnoreResponse = false;

    appointmentService
      .getAppointments(INITIAL_APPOINTMENTS_QUERY)
      .then((response) => {
        if (shouldIgnoreResponse) {
          return;
        }

        setAppointments(response.items);
        setTotal(response.total);
      })
      .catch((error) => {
        if (shouldIgnoreResponse) {
          return;
        }

        console.error(error);
        toast.error(getApiErrorMessage(error) || "No se pudieron cargar las citas.");
      })
      .finally(() => {
        if (shouldIgnoreResponse) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      shouldIgnoreResponse = true;
    };
  }, []);

  return (
    <section className="space-y-6">
      <header className="rounded-[2rem] border border-[#d6e2e0] bg-white px-6 py-5 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#9fb8b4]">
          Agenda
        </p>

        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-light text-[#1f1f1f]">
              Gestión de citas
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-[#7a8588]">
              Consulta, programa y da seguimiento a las citas de pacientes
              dentro de Psicomichi.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#d6e2e0] px-4 py-2 text-sm text-[#4b4b4b]">
                {total} cita{total === 1 ? "" : "s"} encontrada
                {total === 1 ? "" : "s"}
              </span>

              <span className="rounded-full bg-[#f5f7f6] px-4 py-2 text-sm text-[#7a8588]">
                Página 1 · Límite 10
              </span>
            </div>
          </div>

          {canManage ? (
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="rounded-2xl bg-[#afc4c0] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#9fb8b4]"
            >
              Nueva cita
            </button>
          ) : null}
        </div>
      </header>

      <AppointmentsFilters
        values={filters}
        isLoading={isLoading}
        onChange={setFilters}
        onSearch={handleSearch}
        onClear={handleClearFilters}
      />

      <AppointmentsTable
        appointments={appointments}
        isLoading={isLoading}
        canManage={canManage}
        onConfirmAppointment={handleConfirmAppointment}
        onCompleteAppointment={handleCompleteAppointment}
        onCancelAppointment={handleCancelAppointment}
        onNoShowAppointment={handleNoShowAppointment}
        onRescheduleAppointment={handleRescheduleAppointment}
      />

      <CreateAppointmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAppointmentCreated={handleAppointmentCreated}
      />

      <AppointmentActionConfirmModal
        pendingAction={pendingAction}
        isSubmitting={isActionSubmitting}
        reason={actionReason}
        onReasonChange={setActionReason}
        onClose={closeAppointmentActionConfirm}
        onConfirm={() => {
          void handleConfirmAppointmentAction();
        }}
      />

      <RescheduleAppointmentModal
        appointment={appointmentToReschedule}
        isOpen={!!appointmentToReschedule}
        onClose={handleCloseRescheduleModal}
        onAppointmentRescheduled={handleAppointmentRescheduled}
      />
    </section>
  );
}
