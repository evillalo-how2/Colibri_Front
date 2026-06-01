type TimePickerProps = {
  id?: string;
  label?: string;
  value: string;
  error?: string;
  disabled?: boolean;
  minuteStep?: number;
  onChange: (value: string) => void;
};

type Meridiem = "AM" | "PM";

function buildHourOptions() {
  return Array.from({ length: 12 }, (_, index) =>
    String(index + 1).padStart(2, "0"),
  );
}

function buildMinuteOptions(step: number) {
  const safeStep = step > 0 && step <= 60 ? step : 5;
  const count = Math.ceil(60 / safeStep);

  return Array.from({ length: count }, (_, index) =>
    String(index * safeStep).padStart(2, "0"),
  );
}

function parseTime(value: string) {
  if (!value) {
    return {
      hour12: "",
      minute: "",
      meridiem: "AM" as Meridiem,
    };
  }

  const [rawHour = "", rawMinute = ""] = value.split(":");
  const hour24 = Number(rawHour);

  if (Number.isNaN(hour24)) {
    return {
      hour12: "",
      minute: rawMinute,
      meridiem: "AM" as Meridiem,
    };
  }

  const meridiem: Meridiem = hour24 >= 12 ? "PM" : "AM";
  const normalizedHour = hour24 % 12 === 0 ? 12 : hour24 % 12;

  return {
    hour12: String(normalizedHour).padStart(2, "0"),
    minute: rawMinute,
    meridiem,
  };
}

function buildTimeValue(
  hour12: string,
  minute: string,
  meridiem: Meridiem,
): string {
  if (!hour12 || !minute) {
    return "";
  }

  const parsedHour = Number(hour12);

  if (Number.isNaN(parsedHour)) {
    return "";
  }

  let hour24 = parsedHour;

  if (meridiem === "AM" && parsedHour === 12) {
    hour24 = 0;
  }

  if (meridiem === "PM" && parsedHour !== 12) {
    hour24 = parsedHour + 12;
  }

  return `${String(hour24).padStart(2, "0")}:${minute}`;
}

export function TimePicker({
  id,
  label,
  value,
  error,
  disabled = false,
  minuteStep = 5,
  onChange,
}: TimePickerProps) {
  const { hour12, minute, meridiem } = parseTime(value);
  const hours = buildHourOptions();
  const minutes = buildMinuteOptions(minuteStep);

  function handleHourChange(nextHour: string) {
    onChange(buildTimeValue(nextHour, minute || "00", meridiem));
  }

  function handleMinuteChange(nextMinute: string) {
    onChange(buildTimeValue(hour12 || "12", nextMinute, meridiem));
  }

  function handleMeridiemChange(nextMeridiem: Meridiem) {
    onChange(buildTimeValue(hour12 || "12", minute || "00", nextMeridiem));
  }

  return (
    <div className="space-y-2">
      {label ? (
        <label htmlFor={id} className="text-sm text-[#4b4b4b]">
          {label}
        </label>
      ) : null}

      <div
        id={id}
        className={
          error
            ? "grid grid-cols-[1fr_1fr_0.8fr] gap-2 rounded-2xl border border-[#9f4f64] bg-white p-2"
            : "grid grid-cols-[1fr_1fr_0.8fr] gap-2 rounded-2xl border border-[#d6e2e0] bg-white p-2 focus-within:border-[#afc4c0]"
        }
      >
        <select
          value={hour12}
          disabled={disabled}
          onChange={(event) => handleHourChange(event.target.value)}
          className="h-10 rounded-xl border border-transparent bg-[#f5f7f6] px-3 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">Hora</option>
          {hours.map((hourOption) => (
            <option key={hourOption} value={hourOption}>
              {hourOption}
            </option>
          ))}
        </select>

        <select
          value={minute}
          disabled={disabled}
          onChange={(event) => handleMinuteChange(event.target.value)}
          className="h-10 rounded-xl border border-transparent bg-[#f5f7f6] px-3 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">Min</option>
          {minutes.map((minuteOption) => (
            <option key={minuteOption} value={minuteOption}>
              {minuteOption}
            </option>
          ))}
        </select>

        <select
          value={meridiem}
          disabled={disabled}
          onChange={(event) =>
            handleMeridiemChange(event.target.value as Meridiem)
          }
          className="h-10 rounded-xl border border-transparent bg-[#f5f7f6] px-3 text-sm text-[#4b4b4b] outline-none transition focus:border-[#afc4c0] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );
}