import type { FormEvent } from "react";

import { DatePicker } from "../../../shared/components/ui/DatePicker";

import {
  APPOINTMENT_MODALITIES,
  APPOINTMENT_MODALITY_LABELS,
  APPOINTMENT_STATUSES,
  APPOINTMENT_STATUS_LABELS,
  type AppointmentModality,
  type AppointmentStatus,
} from "../types/appointment.types";
import type { AppointmentFiltersValues } from "../types/appointmentFilters.types";

type AppointmentsFiltersProps = {
  values: AppointmentFiltersValues;
  isLoading?: boolean;
  onChange: (values: AppointmentFiltersValues) => void;
  onSearch: () => void;
  onClear: () => void;
};

const MAX_FILTER_DATE = new Date();
MAX_FILTER_DATE.setFullYear(MAX_FILTER_DATE.getFullYear() + 2);

function isInvalidDateRange(dateFrom: string, dateTo: string): boolean {
  if (!dateFrom || !dateTo) {
    return false;
  }

  return dateFrom > dateTo;
}

export function AppointmentsFilters({
  values,
  isLoading = false,
  onChange,
  onSearch,
  onClear,
}: AppointmentsFiltersProps) {
  const hasInvalidDateRange = isInvalidDateRange(
    values.date_from,
    values.date_to,
  );

  function updateField<Key extends keyof AppointmentFiltersValues>(
    key: Key,
    value: AppointmentFiltersValues[Key],
  ) {
    onChange({
      ...values,
      [key]: value,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (hasInvalidDateRange) {
      return;
    }

    onSearch();
  }

  return (
    <section className="rounded-[2rem] border border-[#d6e2e0] bg-white px-6 py-5 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#9fb8b4]">
        Filtros
      </p>

      <form
        className="mt-6 grid items-end gap-4 xl:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr_0.9fr_auto_auto]"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col justify-end gap-2">
          <span className="text-sm text-[#4b4b4b]">Búsqueda</span>
          <input
            value={values.search}
            onChange={(event) => updateField("search", event.target.value)}
            placeholder="Paciente, servicio o nota"
            className="h-11 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition placeholder:text-[#a7b1b3] focus:border-[#afc4c0]"
          />
        </label>

        <label className="flex flex-col justify-end gap-2">
          <span className="text-sm text-[#4b4b4b]">Estado</span>
          <select
            value={values.status}
            onChange={(event) =>
              updateField(
                "status",
                event.target.value as AppointmentStatus | "",
              )
            }
            className="h-11 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0]"
          >
            <option value="">Todos</option>
            {APPOINTMENT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {APPOINTMENT_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col justify-end gap-2">
          <span className="text-sm text-[#4b4b4b]">Modalidad</span>
          <select
            value={values.modality}
            onChange={(event) =>
              updateField(
                "modality",
                event.target.value as AppointmentModality | "",
              )
            }
            className="h-11 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0]"
          >
            <option value="">Todas</option>
            {APPOINTMENT_MODALITIES.map((modality) => (
              <option key={modality} value={modality}>
                {APPOINTMENT_MODALITY_LABELS[modality]}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col justify-end">
          <DatePicker
            id="appointment_date_from"
            label="Desde"
            value={values.date_from}
            maxDate={MAX_FILTER_DATE}
            placeholder="Fecha inicial"
            onChange={(value) => updateField("date_from", value ?? "")}
          />
        </div>

        <div className="flex flex-col justify-end">
          <DatePicker
            id="appointment_date_to"
            label="Hasta"
            value={values.date_to}
            maxDate={MAX_FILTER_DATE}
            placeholder="Fecha final"
            onChange={(value) => updateField("date_to", value ?? "")}
          />
        </div>

        <div className="flex flex-col justify-end gap-2">
          <span className="invisible text-sm">Acción</span>
          <button
            type="submit"
            disabled={isLoading || hasInvalidDateRange}
            className="h-11 rounded-2xl bg-[#afc4c0] px-6 text-sm font-medium text-white transition hover:bg-[#9fb8b4] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Buscar
          </button>
        </div>

        <div className="flex flex-col justify-end gap-2">
          <span className="invisible text-sm">Acción</span>
          <button
            type="button"
            disabled={isLoading}
            onClick={onClear}
            className="h-11 rounded-2xl border border-[#afc4c0] bg-white px-6 text-sm font-medium text-[#4b4b4b] transition hover:bg-[#f5f7f6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Limpiar
          </button>
        </div>

        {hasInvalidDateRange ? (
          <p className="text-sm text-[#9f4f64] xl:col-span-7">
            La fecha inicial no puede ser mayor que la fecha final.
          </p>
        ) : null}
      </form>
    </section>
  );
}