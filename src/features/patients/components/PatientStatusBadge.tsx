import type { PatientStatus } from "../types/patient.types";

const statusLabels: Record<PatientStatus, string> = {
  new: "Nuevo",
  contacted: "Contactado",
  active: "Activo",
  follow_up: "Seguimiento",
  inactive: "Inactivo",
};

const statusClasses: Record<PatientStatus, string> = {
  new: "bg-[#d6e2e0] text-[#4b4b4b]",
  contacted: "bg-[#f5f7f6] text-[#7a8588]",
  active: "bg-[#d6e2e0] text-[#4b4b4b]",
  follow_up: "bg-[#f7e7c8] text-[#8a6a33]",
  inactive: "bg-[#e98ba3]/10 text-[#9f4f64]",
};

type PatientStatusBadgeProps = {
  status: PatientStatus;
};

export function PatientStatusBadge({ status }: PatientStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs ${statusClasses[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}