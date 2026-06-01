import { z } from "zod";
import type { AppointmentModality } from "../types/appointment.types";

const appointmentModalities: [AppointmentModality, ...AppointmentModality[]] = [
  "online",
  "in_person",
  "hybrid",
  "unspecified",
];

function normalizeDateInput(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    const [day, month, year] = value.split("/");

    return `${year}-${month}-${day}`;
  }

  return value;
}

function buildLocalDateTime(date: string, time: string): string {
  return `${normalizeDateInput(date)}T${time}:00`;
}

function isFutureDateTime(value: string): boolean {
  const selectedDate = new Date(value);
  const now = new Date();

  return selectedDate.getTime() > now.getTime();
}

export const createAppointmentSchema = z
  .object({
    patient_id: z.string().min(1, "Selecciona un paciente."),
    service_id: z.string().min(1, "Selecciona un servicio."),
    assigned_to_user_id: z.string().min(1, "Selecciona un profesional."),
    scheduled_date: z.string().min(1, "Selecciona una fecha."),
    scheduled_time: z
      .string()
      .min(1, "Selecciona una hora.")
      .regex(
        /^([01]\d|2[0-3]):[0-5]\d$/,
        "Selecciona una hora válida.",
      ),
    timezone: z.string().min(1, "La zona horaria es obligatoria."),
    modality: z.enum(appointmentModalities, {
      message: "Selecciona una modalidad válida.",
    }),
    location: z
      .string()
      .trim()
      .max(500, "La ubicación no puede superar 500 caracteres."),
    meeting_url: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || z.string().url().safeParse(value).success,
        {
          message: "El enlace de reunión debe ser una URL válida.",
        },
      ),
    notes: z
      .string()
      .trim()
      .max(2000, "Las notas no pueden superar 2000 caracteres."),
  })
  .superRefine((values, context) => {
    const scheduledDateTime = buildLocalDateTime(
      values.scheduled_date,
      values.scheduled_time,
    );

    if (!isFutureDateTime(scheduledDateTime)) {
      context.addIssue({
        code: "custom",
        path: ["scheduled_time"],
        message: "La cita debe agendarse en una fecha y hora futura.",
      });
    }

    if (values.modality === "online" && values.meeting_url.trim() === "") {
      context.addIssue({
        code: "custom",
        path: ["meeting_url"],
        message: "El enlace es obligatorio para citas online.",
      });
    }

    if (values.modality === "in_person" && values.location.trim() === "") {
      context.addIssue({
        code: "custom",
        path: ["location"],
        message: "La ubicación es obligatoria para citas presenciales.",
      });
    }

    if (
      values.modality === "hybrid" &&
      values.location.trim() === "" &&
      values.meeting_url.trim() === ""
    ) {
      context.addIssue({
        code: "custom",
        path: ["location"],
        message: "Agrega ubicación o enlace de reunión para citas híbridas.",
      });
    }
  });
  
export type CreateAppointmentFormValues = z.infer<
  typeof createAppointmentSchema
>;

export const DEFAULT_CREATE_APPOINTMENT_VALUES: CreateAppointmentFormValues = {
  patient_id: "",
  service_id: "",
  assigned_to_user_id: "",
  scheduled_date: "",
  scheduled_time: "",
  timezone: "America/Mexico_City",
  modality: "online",
  location: "",
  meeting_url: "",
  notes: "",
};

export const rescheduleAppointmentSchema = z
  .object({
    scheduled_date: z.string().min(1, "Selecciona una fecha."),
    scheduled_time: z.string().min(1, "Selecciona una hora.").regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Selecciona una hora válida."),
    reschedule_reason: z
      .string()
      .trim()
      .min(3, "El motivo debe tener al menos 3 caracteres.")
      .max(1000, "El motivo no puede superar 1000 caracteres."),
  })
  .superRefine((values, context) => {
    const scheduledDateTime = buildLocalDateTime(
      values.scheduled_date,
      values.scheduled_time,
    );

    if (!isFutureDateTime(scheduledDateTime)) {
      context.addIssue({
        code: "custom",
        path: ["scheduled_time"],
        message: "La nueva fecha y hora deben ser futuras.",
      });
    }
  });

export type RescheduleAppointmentFormValues = z.infer<
  typeof rescheduleAppointmentSchema
>;

export const DEFAULT_RESCHEDULE_APPOINTMENT_VALUES: RescheduleAppointmentFormValues =
  {
    scheduled_date: "",
    scheduled_time: "",
    reschedule_reason: "",
  };