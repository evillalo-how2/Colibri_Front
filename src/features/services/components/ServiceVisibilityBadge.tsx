type ServiceVisibilityBadgeProps = {
  isPublic: boolean;
};

export function ServiceVisibilityBadge({
  isPublic,
}: ServiceVisibilityBadgeProps) {
  return (
    <span
      className={
        isPublic
          ? "inline-flex rounded-full bg-[#d6e2e0] px-3 py-1 text-xs font-medium text-[#4b4b4b]"
          : "inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-[#7a8588]"
      }
    >
      {isPublic ? "Público" : "Oculto"}
    </span>
  );
}