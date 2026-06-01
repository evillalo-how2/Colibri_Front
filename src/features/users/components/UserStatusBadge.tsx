type UserStatusBadgeProps = {
  isActive: boolean;
};

export function UserStatusBadge({ isActive }: UserStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs ${
        isActive
          ? "bg-[#d6e2e0] text-[#4b4b4b]"
          : "bg-[#e98ba3]/10 text-[#9f4f64]"
      }`}
    >
      {isActive ? "Activo" : "Inactivo"}
    </span>
  );
}