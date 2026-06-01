import type {
  AppointmentModality,
  AppointmentStatus,
} from "./appointment.types";

export type AppointmentFiltersValues = {
  search: string;
  status: AppointmentStatus | "";
  modality: AppointmentModality | "";
  date_from: string;
  date_to: string;
};

export const DEFAULT_APPOINTMENT_FILTERS: AppointmentFiltersValues = {
  search: "",
  status: "",
  modality: "",
  date_from: "",
  date_to: "",
};