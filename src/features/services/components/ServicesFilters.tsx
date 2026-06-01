import type { FormEvent } from "react";

import {
  SERVICE_MODALITIES,
  SERVICE_MODALITY_LABELS,
  SERVICE_TYPES,
  SERVICE_TYPE_LABELS,
  type ServiceModality,
  type ServiceType,
} from "../types/service.types";
import type { ServicesFiltersValues } from "../types/serviceFilters.types";

type ServicesFiltersProps = {
  values: ServicesFiltersValues;
  isLoading?: boolean;
  onChange: (values: ServicesFiltersValues) => void;
  onSearch: () => void;
  onClear: () => void;
};

export function ServicesFilters({
  values,
  isLoading = false,
  onChange,
  onSearch,
  onClear,
}: ServicesFiltersProps) {
  function updateField<Key extends keyof ServicesFiltersValues>(
    key: Key,
    value: ServicesFiltersValues[Key],
  ) {
    onChange({
      ...values,
      [key]: value,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <section className="rounded-[2rem] border border-[#d6e2e0] bg-white px-6 py-5 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#9fb8b4]">
        Filtros
      </p>

      <h2 className="mt-3 text-xl font-medium text-[#1f1f1f]">
        Buscar servicios
      </h2>

      <form
        className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_1fr_1fr_0.8fr_0.8fr_0.9fr_auto_auto]"
        onSubmit={handleSubmit}
      >
        <label className="space-y-2">
          <span className="text-sm text-[#4b4b4b]">Búsqueda</span>
          <input
            value={values.search}
            onChange={(event) => updateField("search", event.target.value)}
            placeholder="Nombre, clave o descripción"
            className="h-11 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition placeholder:text-[#a7b1b3] focus:border-[#afc4c0]"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm text-[#4b4b4b]">Tipo</span>
          <select
            value={values.type}
            onChange={(event) =>
              updateField("type", event.target.value as ServiceType | "")
            }
            className="h-11 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0]"
          >
            <option value="">Todos</option>
            {SERVICE_TYPES.map((serviceType) => (
              <option key={serviceType} value={serviceType}>
                {SERVICE_TYPE_LABELS[serviceType]}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm text-[#4b4b4b]">Modalidad</span>
          <select
            value={values.modality}
            onChange={(event) =>
              updateField(
                "modality",
                event.target.value as ServiceModality | "",
              )
            }
            className="h-11 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0]"
          >
            <option value="">Todas</option>
            {SERVICE_MODALITIES.map((modality) => (
              <option key={modality} value={modality}>
                {SERVICE_MODALITY_LABELS[modality]}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm text-[#4b4b4b]">Estado</span>
          <select
            value={values.is_active}
            onChange={(event) =>
              updateField(
                "is_active",
                event.target.value as ServicesFiltersValues["is_active"],
              )
            }
            className="h-11 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0]"
          >
            <option value="">Todos</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm text-[#4b4b4b]">Visibilidad</span>
          <select
            value={values.is_public}
            onChange={(event) =>
              updateField(
                "is_public",
                event.target.value as ServicesFiltersValues["is_public"],
              )
            }
            className="h-11 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0]"
          >
            <option value="">Todos</option>
            <option value="true">Públicos</option>
            <option value="false">Ocultos</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm text-[#4b4b4b]">Cita</span>
          <select
            value={values.requires_appointment}
            onChange={(event) =>
              updateField(
                "requires_appointment",
                event.target
                  .value as ServicesFiltersValues["requires_appointment"],
              )
            }
            className="h-11 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0]"
          >
            <option value="">Todos</option>
            <option value="true">Requiere cita</option>
            <option value="false">No requiere cita</option>
          </select>
        </label>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={isLoading}
            className="h-11 rounded-2xl bg-[#afc4c0] px-6 text-sm font-medium text-white transition hover:bg-[#9fb8b4] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Buscar
          </button>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClear}
            className="h-11 rounded-2xl border border-[#afc4c0] bg-white px-6 text-sm font-medium text-[#4b4b4b] transition hover:bg-[#f5f7f6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Limpiar
          </button>
        </div>
      </form>
    </section>
  );
}