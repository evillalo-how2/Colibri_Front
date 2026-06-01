export function formatAppointmentDateTime(value: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatAppointmentTimeRange(
  start: string,
  end: string,
): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const date = new Intl.DateTimeFormat("es-MX", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(startDate);

  const startTime = new Intl.DateTimeFormat("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(startDate);

  const endTime = new Intl.DateTimeFormat("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(endDate);

  return `${date} · ${startTime} - ${endTime}`;
}