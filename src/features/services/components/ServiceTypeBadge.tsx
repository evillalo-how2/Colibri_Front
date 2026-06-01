import {
  SERVICE_TYPE_LABELS,
  type ServiceType,
} from "../types/service.types";

type ServiceTypeBadgeProps = {
  type: ServiceType;
};

export function ServiceTypeBadge({ type }: ServiceTypeBadgeProps) {
  return (
    <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-[#4b4b4b]">
      {SERVICE_TYPE_LABELS[type]}
    </span>
  );
}