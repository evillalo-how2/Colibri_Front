import type { Appointment } from "../../appointments/types/appointment.types";
import { formatDashboardTimeRange } from "../utils/dashboardDateUtils";

type DashboardAppointmentsListProps = {
  title: string;
  description: string;
  appointments: Appointment[];
  emptyMessage: string;
};

export function DashboardAppointmentsList({
  title,
  description,
  appointments,
  emptyMessage,
}: DashboardAppointmentsListProps) {
  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#9fb8b4]">
          Agenda
        </p>

        <h2 className="mt-3 text-xl font-medium text-[#1f1f1f]">{title}</h2>

        <p className="mt-2 text-sm text-[#7a8588]">{description}</p>
      </div>

      <div className="mt-6 space-y-3">
        {appointments.length === 0 ? (
          <div className="rounded-2xl bg-[#f5f7f6] p-4 text-sm text-[#7a8588]">
            {emptyMessage}
          </div>
        ) : (
          appointments.map((appointment) => (
            <article
              key={appointment.id}
              className="rounded-2xl border border-[#d6e2e0] bg-white p-4"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-medium text-[#4b4b4b]">
                    {appointment.patient.full_name}
                  </p>

                  <p className="mt-1 text-sm text-[#7a8588]">
                    {appointment.service.name}
                  </p>

                  <p className="mt-2 text-xs text-[#9fb8b4]">
                    {appointment.service.catalog_code}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-sm font-medium text-[#4b4b4b]">
                    {formatDashboardTimeRange(
                      appointment.scheduled_start,
                      appointment.scheduled_end,
                    )}
                  </p>

                  <p className="mt-1 text-xs text-[#7a8588]">
                    {appointment.assigned_to_user?.full_name ?? "Sin asignar"}
                  </p>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}