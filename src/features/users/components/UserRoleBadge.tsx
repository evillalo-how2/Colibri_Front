import type { UserType } from "../../auth/types/auth.types";

const roleLabels: Record<UserType, string> = {
  admin: "Administración",
  psychologist: "Psicóloga",
  assistant: "Asistente",
  client: "Cliente",
};

type UserRoleBadgeProps = {
  role: UserType;
};

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  return (
    <span className="inline-flex rounded-full bg-[#d6e2e0] px-3 py-1 text-xs text-[#4b4b4b]">
      {roleLabels[role]}
    </span>
  );
}