import { Button } from "../../shared/components/ui/Button";
import type { CurrentUser } from "../../features/auth/types/auth.types";

type PrivateMobileHeaderProps = {
  currentUser: CurrentUser | null;
  isLoading: boolean;
  onLogout: () => void;
};

export function PrivateMobileHeader({
  currentUser,
  isLoading,
  onLogout,
}: PrivateMobileHeaderProps) {
  return (
    <header className="border-b border-[#d6e2e0] bg-white/80 px-6 py-4 backdrop-blur lg:hidden">
      <div>
        <p className="text-sm tracking-wide text-[#4b4b4b]">
          PSICÓLOGA KAREN CHICO
        </p>
        <p className="mt-1 text-xs text-[#9fb8b4]">
          {currentUser?.full_name ?? "Panel privado"}
        </p>
      </div>

      <Button
        type="button"
        variant="secondary"
        onClick={onLogout}
        isLoading={isLoading}
        className="mt-4 py-2"
      >
        Cerrar sesión
      </Button>
    </header>
  );
}