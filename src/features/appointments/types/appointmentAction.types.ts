import type { Appointment } from "./appointment.types";

export type AppointmentActionType =
  | "confirm"
  | "complete"
  | "cancel"
  | "no_show";

export type PendingAppointmentAction = {
  type: AppointmentActionType;
  appointment: Appointment;
} | null;