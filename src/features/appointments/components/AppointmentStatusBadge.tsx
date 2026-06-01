import {
  APPOINTMENT_STATUS_LABELS,
  type AppointmentStatus,
} from "../types/appointment.types";

type AppointmentStatusBadgeProps = {
  status: AppointmentStatus;
};

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  scheduled:
    "bg-[#d6e2e0] text-[#4b4b4b]",
  confirmed:
    "bg-[#d6e2e0] text-[#4b4b4b]",
  completed:
    "bg-[#eef3ef] text-[#4b4b4b]",
  cancelled:
    "bg-[#f3e1e5] text-[#9f4f64]",
  no_show:
    "bg-[#f3e1e5] text-[#9f4f64]",
  rescheduled:
    "bg-[#f5f7f6] text-[#7a8588]",
};

export function AppointmentStatusBadge({
  status,
}: AppointmentStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {APPOINTMENT_STATUS_LABELS[status]}
    </span>
  );
}