import { Button } from "../../../shared/components/ui/Button";
import type { UserType } from "../../auth/types/auth.types";

export type UsersFilterStatus = "all" | "active" | "inactive";

export type UsersFiltersValue = {
  search: string;
  userType: UserType | "all";
  status: UsersFilterStatus;
};

type UsersFiltersProps = {
  values: UsersFiltersValue;
  isLoading: boolean;
  onChange: <K extends keyof UsersFiltersValue>(
    key: K,
    value: UsersFiltersValue[K],
  ) => void;
  onSubmit: () => void;
  onClear: () => void;
};

const inputClassName =
  "w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-sm text-[#4b4b4b] outline-none transition placeholder:text-[#a8b2b4] focus:border-[#afc4c0] focus:ring-4 focus:ring-[#afc4c0]/20";

export function UsersFilters({
  values,
  isLoading,
  onChange,
  onSubmit,
  onClear,
}: UsersFiltersProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-xl shadow-[#afc4c0]/10 backdrop-blur"
    >
      <div className="mb-5">
        <p className="text-sm uppercase tracking-[0.35em] text-[#9fb8b4]">
          Filtros
        </p>
        <h2 className="mt-2 text-2xl font-light text-[#1f1f1f]">
          Buscar usuarios
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
        <div>
          <label className="mb-2 block text-sm text-[#4b4b4b]">
            Búsqueda
          </label>
          <input
            type="search"
            value={values.search}
            onChange={(event) => onChange("search", event.target.value)}
            placeholder="Nombre o email"
            className={inputClassName}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-[#4b4b4b]">Rol</label>
          <select
            value={values.userType}
            onChange={(event) =>
              onChange("userType", event.target.value as UserType | "all")
            }
            className={inputClassName}
          >
            <option value="all">Todos</option>
            <option value="admin">Administración</option>
            <option value="psychologist">Psicóloga</option>
            <option value="assistant">Asistente</option>
            <option value="client">Cliente</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-[#4b4b4b]">Estado</label>
          <select
            value={values.status}
            onChange={(event) =>
              onChange("status", event.target.value as UsersFilterStatus)
            }
            className={inputClassName}
          >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>

        <div className="flex items-end gap-3">
          <Button type="submit" isLoading={isLoading} className="px-5">
            Buscar
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={onClear}
            disabled={isLoading}
            className="px-5"
          >
            Limpiar
          </Button>
        </div>
      </div>
    </form>
  );
}