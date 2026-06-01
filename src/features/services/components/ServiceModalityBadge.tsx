import {
  SERVICE_MODALITY_LABELS,
  type ServiceModality,
} from "../types/service.types";

type ServiceModalityBadgeProps = {
  modality: ServiceModality;
};

export function ServiceModalityBadge({
  modality,
}: ServiceModalityBadgeProps) {
  return (
    <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-[#4b4b4b]">
      {SERVICE_MODALITY_LABELS[modality]}
    </span>
  );
}