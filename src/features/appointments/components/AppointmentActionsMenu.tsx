import type {
  Appointment,
  AppointmentStatus,
} from "../types/appointment.types";

const ACTIVE_APPOINTMENT_STATUSES: AppointmentStatus[] = [
  "scheduled",
  "confirmed",
  "rescheduled",
];

function isActiveAppointmentStatus(status: AppointmentStatus): boolean {
  return ACTIVE_APPOINTMENT_STATUSES.includes(status);
}

function isPastOrCurrentAppointment(start: string): boolean {
  return new Date(start).getTime() <= new Date().getTime();
}

type AppointmentActionsMenuProps = {
  appointment: Appointment;
  canManage: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onConfirm: (appointment: Appointment) => void;
  onComplete: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
  onNoShow: (appointment: Appointment) => void;
  onReschedule: (appointment: Appointment) => void;
};

export function AppointmentActionsMenu({
  appointment,
  canManage,
  isOpen,
  onToggle,
  onClose,
  onConfirm,
  onComplete,
  onCancel,
  onNoShow,
  onReschedule,
}: AppointmentActionsMenuProps) {
  function handleConfirm() {
    onClose();
    onConfirm(appointment);
  }

  function handleComplete() {
    onClose();
    onComplete(appointment);
  }

  function handleCancel() {
    onClose();
    onCancel(appointment);
  }

  function handleNoShow() {
    onClose();
    onNoShow(appointment);
  }

  function handleReschedule() {
    onClose();
    onReschedule(appointment);
  }

  const isActiveAppointment = isActiveAppointmentStatus(appointment.status);
  const canResolveByTime = isPastOrCurrentAppointment(
    appointment.scheduled_start,
  );

  const canConfirm =
    appointment.status === "scheduled" || appointment.status === "rescheduled";

  const canComplete = isActiveAppointment && canResolveByTime;
  const canCancel = isActiveAppointment;
  const canNoShow = isActiveAppointment && canResolveByTime;
  const canReschedule = isActiveAppointment;

  if (!canManage) {
    return <span className="text-sm text-[#9fb8b4]">Solo lectura</span>;
  }

  return (
    <div className="relative inline-flex justify-end">
      <button
        type="button"
        onClick={onToggle}
        className="rounded-2xl border border-[#afc4c0] bg-white px-4 py-2 text-sm text-[#4b4b4b] transition hover:bg-[#f5f7f6]"
      >
        Acciones
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-12 z-20 w-56 overflow-hidden rounded-2xl border border-[#d6e2e0] bg-white shadow-lg">
          {canConfirm ? (
            <button
              type="button"
              onClick={handleConfirm}
              className="block w-full px-4 py-3 text-left text-sm text-[#4b4b4b] transition hover:bg-[#f5f7f6]"
            >
              Confirmar
            </button>
          ) : null}

          {canComplete ? (
            <button
              type="button"
              onClick={handleComplete}
              className="block w-full px-4 py-3 text-left text-sm text-[#4b4b4b] transition hover:bg-[#f5f7f6]"
            >
              Completar
            </button>
          ) : null}

          {canReschedule ? (
            <button
              type="button"
              onClick={handleReschedule}
              className="block w-full px-4 py-3 text-left text-sm text-[#4b4b4b] transition hover:bg-[#f5f7f6]"
            >
              Reagendar
            </button>
          ) : null}

          {canNoShow ? (
            <button
              type="button"
              onClick={handleNoShow}
              className="block w-full px-4 py-3 text-left text-sm text-[#9f4f64] transition hover:bg-[#f5f7f6]"
            >
              No asistió
            </button>
          ) : null}

          {canCancel ? (
            <button
              type="button"
              onClick={handleCancel}
              className="block w-full px-4 py-3 text-left text-sm text-[#9f4f64] transition hover:bg-[#f5f7f6]"
            >
              Cancelar
            </button>
          ) : null}

          {!canConfirm &&
            !canComplete &&
            !canReschedule &&
            !canNoShow &&
            !canCancel ? (
            <div className="px-4 py-3 text-left text-sm text-[#9fb8b4]">
              Sin acciones disponibles
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}