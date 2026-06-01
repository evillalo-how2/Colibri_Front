import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Controller,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../../../shared/components/ui/Button";
import { DatePicker } from "../../../shared/components/ui/DatePicker";
import { FormError } from "../../../shared/components/ui/FormError";
import { TimePicker } from "../../../shared/components/ui/TimePicker";
import {
  DEFAULT_RESCHEDULE_APPOINTMENT_VALUES,
  rescheduleAppointmentSchema,
  type RescheduleAppointmentFormValues,
} from "../schemas/appointment.schema";
import { appointmentService } from "../services/appointmentService";
import type { Appointment } from "../types/appointment.types";
import { formatAppointmentTimeRange } from "../utils/appointmentFormatters";
import { mapRescheduleAppointmentFormToRequest } from "../utils/appointmentMappers";
import { APPOINTMENT_TIME_STEP_MINUTES } from "../config/appointment.config";
import { getApiErrorMessage } from "../../../shared/utils/apiError";

const MIN_APPOINTMENT_DATE = new Date();
MIN_APPOINTMENT_DATE.setHours(0, 0, 0, 0);

const MAX_APPOINTMENT_DATE = new Date();
MAX_APPOINTMENT_DATE.setFullYear(MAX_APPOINTMENT_DATE.getFullYear() + 2);

type RescheduleAppointmentModalProps = {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onAppointmentRescheduled: () => void;
};

function getDateInputValue(value: string): string {
  return value.slice(0, 10);
}

function getTimeInputValue(value: string): string {
  const date = new Date(value);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function RescheduleAppointmentModal({
  appointment,
  isOpen,
  onClose,
  onAppointmentRescheduled,
}: RescheduleAppointmentModalProps) {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RescheduleAppointmentFormValues>({
    resolver: zodResolver(rescheduleAppointmentSchema),
    defaultValues: DEFAULT_RESCHEDULE_APPOINTMENT_VALUES,
  });

  useEffect(() => {
    if (!isOpen || !appointment) {
      return;
    }

    reset({
      scheduled_date: getDateInputValue(appointment.scheduled_start),
      scheduled_time: getTimeInputValue(appointment.scheduled_start),
      reschedule_reason: "",
    });
  }, [appointment, isOpen, reset]);

  if (!isOpen || !appointment) {
    return null;
  }

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    reset(DEFAULT_RESCHEDULE_APPOINTMENT_VALUES);
    onClose();
  }

  const onSubmit: SubmitHandler<RescheduleAppointmentFormValues> = async (
    values,
  ) => {
    try {
      const payload = mapRescheduleAppointmentFormToRequest(values);

      await appointmentService.rescheduleAppointment(appointment.id, payload);

      toast.success("Cita reagendada correctamente.");
      reset(DEFAULT_RESCHEDULE_APPOINTMENT_VALUES);
      onAppointmentRescheduled();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        getApiErrorMessage(error) || "No se pudo reagendar la cita. Revisa que no exista empalme.",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1f1f]/40 px-4 py-6 backdrop-blur-sm">
      <section className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-[#d6e2e0] bg-white shadow-2xl">
        <header className="border-b border-[#d6e2e0] px-6 py-5">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#9fb8b4]">
            Agenda
          </p>

          <h2 className="mt-2 text-2xl font-light text-[#1f1f1f]">
            Reagendar cita
          </h2>

          <p className="mt-2 text-sm text-[#7a8588]">
            Cambia la fecha y hora de la cita seleccionada.
          </p>
        </header>

        <form
          id="reschedule-appointment-form"
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-6">
            <div className="rounded-2xl border border-[#d6e2e0] bg-[#f5f7f6] p-4">
              <p className="text-sm font-medium text-[#4b4b4b]">
                {appointment.patient.full_name}
              </p>

              <p className="mt-1 text-xs text-[#7a8588]">
                {appointment.service.name} ·{" "}
                {appointment.service.catalog_code}
              </p>

              <p className="mt-2 text-xs text-[#9fb8b4]">
                Horario actual:{" "}
                {formatAppointmentTimeRange(
                  appointment.scheduled_start,
                  appointment.scheduled_end,
                )}
              </p>
            </div>

            <section className="grid gap-4 md:grid-cols-2">
              <div>
                <Controller
                  control={control}
                  name="scheduled_date"
                  render={({ field }) => (
                    <DatePicker
                      id="reschedule_scheduled_date"
                      label="Nueva fecha"
                      value={field.value}
                      minDate={MIN_APPOINTMENT_DATE}
                      maxDate={MAX_APPOINTMENT_DATE}
                      placeholder="Selecciona la nueva fecha"
                      error={errors.scheduled_date?.message}
                      onChange={(value) => field.onChange(value ?? "")}
                    />
                  )}
                />
                <FormError message={errors.scheduled_date?.message} />
              </div>

              <div>
                <Controller
                  control={control}
                  name="scheduled_time"
                  render={({ field }) => (
                    <TimePicker
                      id="reschedule_scheduled_time"
                      label="Nueva hora"
                      value={field.value}
                      disabled={isSubmitting}
                      minuteStep={APPOINTMENT_TIME_STEP_MINUTES}
                      error={errors.scheduled_time?.message}
                      onChange={field.onChange}
                    />
                  )}
                />
                <FormError message={errors.scheduled_time?.message} />
              </div>
            </section>

            <label className="space-y-2">
              <span className="text-sm text-[#4b4b4b]">
                Motivo de reagenda
              </span>

              <textarea
                rows={4}
                placeholder="Ej. Paciente solicitó cambio de horario."
                disabled={isSubmitting}
                className="w-full resize-none rounded-2xl border border-[#d6e2e0] bg-white px-4 py-3 text-sm text-[#4b4b4b] outline-none transition placeholder:text-[#a7b1b3] focus:border-[#afc4c0] disabled:cursor-not-allowed disabled:bg-[#f5f7f6]"
                {...register("reschedule_reason")}
              />
              <FormError message={errors.reschedule_reason?.message} />
            </label>
          </div>

          <footer className="flex flex-col-reverse gap-3 border-t border-[#d6e2e0] px-6 py-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              disabled={isSubmitting}
              onClick={handleClose}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              form="reschedule-appointment-form"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Reagendar cita"}
            </Button>
          </footer>
        </form>
      </section>
    </div>
  );
}