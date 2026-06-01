import { useEffect, useRef, useState } from "react";

import {
  APPOINTMENT_CREATED_SOURCE_LABELS,
  type Appointment,
} from "../types/appointment.types";
import { formatAppointmentTimeRange } from "../utils/appointmentFormatters";
import { AppointmentActionsMenu } from "./AppointmentActionsMenu";
import { AppointmentModalityBadge } from "./AppointmentModalityBadge";
import { AppointmentStatusBadge } from "./AppointmentStatusBadge";

type AppointmentsTableProps = {
  appointments: Appointment[];
  isLoading: boolean;
  canManage: boolean;
  onConfirmAppointment: (appointment: Appointment) => void;
  onCompleteAppointment: (appointment: Appointment) => void;
  onCancelAppointment: (appointment: Appointment) => void;
  onNoShowAppointment: (appointment: Appointment) => void;
  onRescheduleAppointment: (appointment: Appointment) => void;
};

export function AppointmentsTable({
  appointments,
  isLoading,
  canManage,
  onConfirmAppointment,
  onCompleteAppointment,
  onCancelAppointment,
  onNoShowAppointment,
  onRescheduleAppointment,
}: AppointmentsTableProps) {
  const [openMenuAppointmentId, setOpenMenuAppointmentId] = useState<
    string | null
  >(null);

  const actionsMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!openMenuAppointmentId) {
        return;
      }

      const target = event.target as Node;

      if (!actionsMenuRef.current?.contains(target)) {
        setOpenMenuAppointmentId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuAppointmentId]);

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
        <p className="text-sm text-[#7a8588]">Cargando citas...</p>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
        <p className="text-sm text-[#7a8588]">
          No hay citas registradas con los filtros seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-xl shadow-[#afc4c0]/10 backdrop-blur">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1300px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#d6e2e0] text-xs uppercase tracking-[0.25em] text-[#9fb8b4]">
              <th className="px-6 py-5 font-normal">Paciente</th>
              <th className="px-6 py-5 font-normal">Servicio</th>
              <th className="px-6 py-5 font-normal">Horario</th>
              <th className="px-6 py-5 font-normal">Modalidad</th>
              <th className="px-6 py-5 font-normal">Estado</th>
              <th className="px-6 py-5 font-normal">Responsable</th>
              <th className="px-6 py-5 font-normal">Lugar / enlace</th>
              <th className="px-6 py-5 text-right font-normal">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-b border-[#d6e2e0]/70 text-sm text-[#4b4b4b] last:border-b-0 hover:bg-[#f5f7f6]/80"
              >
                <td className="px-6 py-6">
                  <div>
                    <p className="font-medium">
                      {appointment.patient.full_name}
                    </p>

                    <div className="mt-1 space-y-0.5 text-xs text-[#7a8588]">
                      <p>{appointment.patient.email ?? "Sin email"}</p>
                      <p>{appointment.patient.phone ?? "Sin teléfono"}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-6">
                  <div>
                    <p className="font-medium">{appointment.service.name}</p>

                    <p className="mt-1 text-xs text-[#9fb8b4]">
                      {appointment.service.catalog_code}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-6 text-[#7a8588]">
                  <p className="whitespace-nowrap">
                    {formatAppointmentTimeRange(
                      appointment.scheduled_start,
                      appointment.scheduled_end,
                    )}
                  </p>

                  <p className="mt-1 text-xs">{appointment.timezone}</p>
                </td>

                <td className="px-6 py-6">
                  <AppointmentModalityBadge modality={appointment.modality} />
                </td>

                <td className="px-6 py-6">
                  <div>
                    <AppointmentStatusBadge status={appointment.status} />

                    {appointment.cancellation_reason ? (
                      <p
                        title={appointment.cancellation_reason}
                        className="mt-2 line-clamp-1 max-w-xs text-xs text-[#9f4f64]"
                      >
                        {appointment.cancellation_reason}
                      </p>
                    ) : null}

                    {appointment.reschedule_reason ? (
                      <p
                        title={appointment.reschedule_reason}
                        className="mt-2 line-clamp-1 max-w-xs text-xs text-[#7a8588]"
                      >
                        {appointment.reschedule_reason}
                      </p>
                    ) : null}
                  </div>
                </td>

                <td className="px-6 py-6">
                  <div className="space-y-1 text-sm text-[#7a8588]">
                    {appointment.assigned_to_user ? (
                      <p className="font-medium text-[#4b4b4b]">
                        {appointment.assigned_to_user.full_name}
                      </p>
                    ) : (
                      <span className="inline-flex rounded-full bg-[#f3e1e5] px-3 py-1 text-xs font-medium text-[#9f4f64]">
                        Responsable no asignado
                      </span>
                    )}

                    <p className="mt-2 text-xs text-[#7a8588]">
                      Levantó:{" "}
                      <span className="font-medium text-[#4b4b4b]">
                        {appointment.created_by_user?.full_name ??
                          APPOINTMENT_CREATED_SOURCE_LABELS[
                          appointment.created_source
                          ]}
                      </span>
                    </p>
                  </div>
                </td>

                <td className="px-6 py-6 text-[#7a8588]">
                  <div className="space-y-2">
                    {appointment.meeting_url ? (
                      <p>
                        <span className="text-xs text-[#9fb8b4]">
                          Enlace:{" "}
                        </span>

                        <a
                          href={appointment.meeting_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#4b4b4b] underline-offset-4 hover:underline"
                        >
                          Abrir enlace
                        </a>
                      </p>
                    ) : null}

                    {appointment.location ? (
                      <p>
                        <span className="text-xs text-[#9fb8b4]">
                          Lugar:{" "}
                        </span>
                        {appointment.location}
                      </p>
                    ) : null}

                    {!appointment.meeting_url && !appointment.location ? (
                      <span>Sin definir</span>
                    ) : null}

                    {appointment.notes ? (
                      <p
                        title={appointment.notes}
                        className="mt-2 line-clamp-1 max-w-xs text-xs text-[#7a8588]"
                      >
                        {appointment.notes}
                      </p>
                    ) : null}
                  </div>
                </td>

                <td className="px-6 py-6 text-right">
                  <div
                    ref={
                      openMenuAppointmentId === appointment.id
                        ? actionsMenuRef
                        : undefined
                    }
                    className="inline-flex justify-end"
                  >
                    <AppointmentActionsMenu
                      appointment={appointment}
                      canManage={canManage}
                      isOpen={openMenuAppointmentId === appointment.id}
                      onToggle={() =>
                        setOpenMenuAppointmentId((currentId) =>
                          currentId === appointment.id ? null : appointment.id,
                        )
                      }
                      onClose={() => setOpenMenuAppointmentId(null)}
                      onConfirm={onConfirmAppointment}
                      onComplete={onCompleteAppointment}
                      onCancel={onCancelAppointment}
                      onNoShow={onNoShowAppointment}
                      onReschedule={onRescheduleAppointment}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}