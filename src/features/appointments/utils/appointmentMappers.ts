import type {
  CreateAppointmentFormValues,
  RescheduleAppointmentFormValues,
} from "../schemas/appointment.schema";
import type {
  CreateAppointmentRequest,
  RescheduleAppointmentRequest,
} from "../types/appointment.types";

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

function stringToNullableText(value: string): string | null {
  const trimmedValue = value.trim();

  return trimmedValue === "" ? null : trimmedValue;
}

function buildScheduledStart(
  scheduledDate: string,
  scheduledTime: string,
): string {
  return `${normalizeDateInput(scheduledDate)}T${scheduledTime}:00-06:00`;
}

export function mapCreateAppointmentFormToRequest(
  values: CreateAppointmentFormValues,
): CreateAppointmentRequest {
  return {
    patient_id: values.patient_id,
    service_id: values.service_id,
    assigned_to_user_id: values.assigned_to_user_id,
    scheduled_start: buildScheduledStart(
      values.scheduled_date,
      values.scheduled_time,
    ),
    timezone: values.timezone,
    modality: values.modality,
    location: stringToNullableText(values.location),
    meeting_url: stringToNullableText(values.meeting_url),
    notes: stringToNullableText(values.notes),
  };
}

export function mapRescheduleAppointmentFormToRequest(
  values: RescheduleAppointmentFormValues,
): RescheduleAppointmentRequest {
  return {
    scheduled_start: buildScheduledStart(
      values.scheduled_date,
      values.scheduled_time,
    ),
    reschedule_reason: values.reschedule_reason.trim(),
  };
}
