import { Button } from "../../shared/components/ui/Button";
import type { CurrentUser } from "../../features/auth/types/auth.types";

const roleLabels: Record<string, string> = {
  admin: "Administración",
  psychologist: "Psicóloga",
  assistant: "Asistente",
  client: "Cliente",
};

type UserSessionCardProps = {
  currentUser: CurrentUser | null;
  isLoading: boolean;
  onLogout: () => void;
};

export function UserSessionCard({
  currentUser,
  isLoading,
  onLogout,
}: UserSessionCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-[#d6e2e0] bg-white/70 p-4">
      <p className="text-sm font-medium text-[#4b4b4b]">
        {currentUser?.full_name ?? "Usuario"}
      </p>

      <p className="mt-1 break-words text-xs text-[#7a8588]">
        {currentUser?.email ?? "Sin email"}
      </p>

      <p className="mt-3 inline-flex rounded-full bg-[#d6e2e0] px-3 py-1 text-xs text-[#4b4b4b]">
        {currentUser?.user_type
          ? roleLabels[currentUser.user_type]
          : "Sin rol"}
      </p>

      <Button
        type="button"
        variant="secondary"
        onClick={onLogout}
        isLoading={isLoading}
        className="mt-4 w-full py-2"
      >
        Cerrar sesión
      </Button>
    </div>
  );
}