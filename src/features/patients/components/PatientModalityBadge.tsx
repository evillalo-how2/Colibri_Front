import type { PatientModality } from "../types/patient.types";

const modalityLabels: Record<PatientModality, string> = {
  online: "Online",
  in_person: "Presencial",
  hybrid: "Híbrida",
  unspecified: "Sin definir",
};

const modalityClasses: Record<PatientModality, string> = {
  online: "bg-[#d6e2e0] text-[#4b4b4b]",
  in_person: "bg-[#f5f7f6] text-[#7a8588]",
  hybrid: "bg-[#f7e7c8] text-[#8a6a33]",
  unspecified: "bg-[#e98ba3]/10 text-[#9f4f64]",
};

type PatientModalityBadgeProps = {
  modality: PatientModality;
};

export function PatientModalityBadge({
  modality,
}: PatientModalityBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs ${modalityClasses[modality]}`}>
      {modalityLabels[modality]}
    </span>
  );
}