type ServiceAppointmentBadgeProps = {
  requiresAppointment: boolean;
};

export function ServiceAppointmentBadge({
  requiresAppointment,
}: ServiceAppointmentBadgeProps) {
  return (
    <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-[#7a8588]">
      {requiresAppointment ? "Requiere cita" : "No requiere cita"}
    </span>
  );
}