export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show"
  | "rescheduled";

export type AppointmentModality =
  | "online"
  | "in_person"
  | "hybrid"
  | "unspecified";

export type AppointmentCreatedSource =
  | "staff"
  | "patient"
  | "bot"
  | "system";

export type AppointmentPatientSummary = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
};

export type AppointmentServiceSummary = {
  id: string;
  name: string;
  catalog_code: string;
  duration_minutes: number | null;
  price_cents: number;
  currency: "MXN" | "USD";
};

export type AppointmentUserSummary = {
  id: string;
  full_name: string;
  email: string;
  user_type: "admin" | "psychologist" | "assistant" | "client";
  is_superuser?: boolean;
};

export type Appointment = {
  id: string;
  patient_id: string;
  patient: AppointmentPatientSummary;
  service_id: string;
  service: AppointmentServiceSummary;

  created_source: AppointmentCreatedSource;
  created_by_user_id: string | null;
  created_by_user: AppointmentUserSummary | null;
  assigned_to_user_id: string | null;
  assigned_to_user: AppointmentUserSummary | null;

  scheduled_start: string;
  scheduled_end: string;
  timezone: string;
  status: AppointmentStatus;
  modality: AppointmentModality;
  location: string | null;
  meeting_url: string | null;
  notes: string | null;
  cancellation_reason: string | null;
  reschedule_reason: string | null;
  created_at: string;
  updated_at: string;
};

export type AppointmentsListQuery = {
  search?: string;
  patient_id?: string;
  service_id?: string;

  created_source?: AppointmentCreatedSource;
  created_by_user_id?: string;
  assigned_to_user_id?: string;

  status?: AppointmentStatus;
  modality?: AppointmentModality;

  date_from?: string;
  date_to?: string;

  page?: number;
  limit?: number;
};

export type AppointmentsListResponse = {
  items: Appointment[];
  total: number;
  page: number;
  limit: number;
};

export type CreateAppointmentRequest = {
  patient_id: string;
  service_id: string;
  assigned_to_user_id: string;
  scheduled_start: string;
  timezone: string;
  modality: AppointmentModality;
  location?: string | null;
  meeting_url?: string | null;
  notes?: string | null;
};

export type UpdateAppointmentRequest = {
  patient_id?: string;
  service_id?: string;
  assigned_to_user_id?: string | null;
  scheduled_start?: string;
  timezone?: string;
  modality?: AppointmentModality;
  location?: string | null;
  meeting_url?: string | null;
  notes?: string | null;
};

export type CancelAppointmentRequest = {
  cancellation_reason: string;
};

export type NoShowAppointmentRequest = {
  notes?: string | null;
};

export type RescheduleAppointmentRequest = {
  scheduled_start: string;
  reschedule_reason: string;
};

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  scheduled: "Programada",
  confirmed: "Confirmada",
  completed: "Completada",
  cancelled: "Cancelada",
  no_show: "No asistió",
  rescheduled: "Reagendada",
};

export const APPOINTMENT_MODALITY_LABELS: Record<AppointmentModality, string> = {
  online: "Online",
  in_person: "Presencial",
  hybrid: "Híbrida",
  unspecified: "Sin definir",
};

export const APPOINTMENT_CREATED_SOURCE_LABELS: Record<
  AppointmentCreatedSource,
  string
> = {
  staff: "Panel interno",
  patient: "Paciente",
  bot: "Bot",
  system: "Sistema",
};

export const APPOINTMENT_STATUSES: AppointmentStatus[] = [
  "scheduled",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
  "rescheduled",
];

export const APPOINTMENT_MODALITIES: AppointmentModality[] = [
  "online",
  "in_person",
  "hybrid",
  "unspecified",
];

export const APPOINTMENT_CREATED_SOURCES: AppointmentCreatedSource[] = [
  "staff",
  "patient",
  "bot",
  "system",
];