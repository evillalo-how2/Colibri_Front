import {
  APPOINTMENT_MODALITY_LABELS,
  type AppointmentModality,
} from "../types/appointment.types";

type AppointmentModalityBadgeProps = {
  modality: AppointmentModality;
};

export function AppointmentModalityBadge({
  modality,
}: AppointmentModalityBadgeProps) {
  return (
    <span className="inline-flex rounded-full bg-[#d6e2e0] px-3 py-1 text-xs font-medium text-[#4b4b4b]">
      {APPOINTMENT_MODALITY_LABELS[modality]}
    </span>
  );
}