type ServiceActiveBadgeProps = {
  isActive: boolean;
};

export function ServiceActiveBadge({ isActive }: ServiceActiveBadgeProps) {
  return (
    <span
      className={
        isActive
          ? "inline-flex rounded-full bg-[#d6e2e0] px-3 py-1 text-xs font-medium text-[#4b4b4b]"
          : "inline-flex rounded-full bg-[#f3e1e5] px-3 py-1 text-xs font-medium text-[#9f4f64]"
      }
    >
      {isActive ? "Activo" : "Inactivo"}
    </span>
  );
}