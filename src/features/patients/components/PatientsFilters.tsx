import { Button } from "../../../shared/components/ui/Button";
import type {
  PatientModality,
  PatientStatus,
} from "../types/patient.types";

export type PatientsFilterActivity = "all" | "active" | "inactive";

export type PatientsFiltersValue = {
  search: string;
  status: PatientStatus | "all";
  preferredModality: PatientModality | "all";
  activity: PatientsFilterActivity;
};

type PatientsFiltersProps = {
  values: PatientsFiltersValue;
  isLoading: boolean;
  onChange: <K extends keyof PatientsFiltersValue>(
    key: K,
    value: PatientsFiltersValue[K],
  ) => void;
  onSubmit: () => void;
  onClear: () => void;
};

const inputClassName =
  "w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-sm text-[#4b4b4b] outline-none transition placeholder:text-[#a8b2b4] focus:border-[#afc4c0] focus:ring-4 focus:ring-[#afc4c0]/20";

export function PatientsFilters({
  values,
  isLoading,
  onChange,
  onSubmit,
  onClear,
}: PatientsFiltersProps) {
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
          Buscar pacientes
        </h2>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
        <div>
          <label className="mb-2 block text-sm text-[#4b4b4b]">
            Búsqueda
          </label>
          <input
            type="search"
            value={values.search}
            onChange={(event) => onChange("search", event.target.value)}
            placeholder="Nombre, email o teléfono"
            className={inputClassName}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-[#4b4b4b]">Estado</label>
          <select
            value={values.status}
            onChange={(event) =>
              onChange("status", event.target.value as PatientStatus | "all")
            }
            className={inputClassName}
          >
            <option value="all">Todos</option>
            <option value="new">Nuevo</option>
            <option value="contacted">Contactado</option>
            <option value="active">Activo</option>
            <option value="follow_up">Seguimiento</option>
            <option value="inactive">Inactivo</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-[#4b4b4b]">
            Modalidad
          </label>
          <select
            value={values.preferredModality}
            onChange={(event) =>
              onChange(
                "preferredModality",
                event.target.value as PatientModality | "all",
              )
            }
            className={inputClassName}
          >
            <option value="all">Todas</option>
            <option value="online">Online</option>
            <option value="in_person">Presencial</option>
            <option value="hybrid">Híbrida</option>
            <option value="unspecified">Sin definir</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-[#4b4b4b]">
            Actividad
          </label>
          <select
            value={values.activity}
            onChange={(event) =>
              onChange(
                "activity",
                event.target.value as PatientsFilterActivity,
              )
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