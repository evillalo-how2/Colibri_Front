import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

type DatePickerProps = {
  id?: string;
  label?: string;
  value: string;
  placeholder?: string;
  error?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  onChange: (value: string | null) => void;
};

function parseIsoDate(value: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return undefined;
  }

  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function formatDateToIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDateToDisplay(value: string): string {
  const date = parseIsoDate(value);

  if (!date) {
    return "";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function DatePicker({
  id,
  label,
  value,
  placeholder = "Selecciona una fecha",
  error,
  minDate,
  maxDate,
  disabled = false,
  onChange,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedDate = useMemo(() => parseIsoDate(value), [value]);
  const displayValue = formatDateToDisplay(value);

  function handleSelect(date?: Date) {
    if (!date) {
      onChange(null);
      return;
    }

    onChange(formatDateToIso(date));
    setIsOpen(false);
  }

  return (
    <div className="relative space-y-2">
      {label ? (
        <label htmlFor={id} className="text-sm text-[#4b4b4b]">
          {label}
        </label>
      ) : null}

      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className={
          error
            ? "h-12 w-full rounded-2xl border border-[#9f4f64] bg-white px-4 text-left text-sm text-[#4b4b4b] outline-none transition disabled:cursor-not-allowed disabled:bg-[#f5f7f6]"
            : "h-12 w-full rounded-2xl border border-[#d6e2e0] bg-white px-4 text-left text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] disabled:cursor-not-allowed disabled:bg-[#f5f7f6]"
        }
      >
        {displayValue || (
          <span className="text-[#a7b1b3]">{placeholder}</span>
        )}
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-full z-50 mt-2 rounded-2xl border border-[#d6e2e0] bg-white p-4 shadow-xl">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            defaultMonth={selectedDate ?? new Date()}
            disabled={[
              minDate ? { before: minDate } : false,
              maxDate ? { after: maxDate } : false,
            ].filter(Boolean) as Parameters<typeof DayPicker>[0]["disabled"]}
          />
        </div>
      ) : null}
    </div>
  );
}